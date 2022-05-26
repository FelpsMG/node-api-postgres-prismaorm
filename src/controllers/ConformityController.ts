import {Request} from 'express';
import {socioambientais} from '@prisma/client';
import prisma from '../db/PrismaConn';

export class ControllerPrisma {
  async findIntersections(
    request: Request,
  ) {
    const point = {
      type: 'Point',
      coordinates: [request.query.longitude, request.query.latitude],
    };

    const jsonPoint = JSON.stringify(point);

    const intersection = await prisma.$queryRaw<socioambientais[]>`
                SELECT tipo, nome FROM socioambientais 
                WHERE st_intersects(socioambientais.geom, ST_SetSRID(ST_GeomFromGeoJSON(${jsonPoint}), ST_SRID(socioambientais.geom)))`;
    const inconformidades = {
      tipos: [],
      nomes: [],
    };

    if (intersection.length === 0) return {inconformidade: inconformidades};
    else {
      intersection.forEach(intersect => {
        inconformidades.tipos.push(intersect.tipo);
        inconformidades.nomes.push(intersect.nome);
      });
      return {inconformidade: inconformidades};
    }
  }

  async verifyConformity(
    request: Request,
  ) {
    const point = {
      type: 'Point',
      coordinates: [request.query.longitude, request.query.latitude],
    };

    const jsonPoint = JSON.stringify(point);

    const intersecao_soc_amb = await prisma.$queryRaw<socioambientais[]>`
                SELECT tipo, nome FROM socioambientais 
                WHERE st_intersects(socioambientais.geom, ST_SetSRID(ST_GeomFromGeoJSON(${jsonPoint}), ST_SRID(socioambientais.geom)))`;

    const trab_escravo = await prisma.trabalho_escravo.findMany({
      where: {
        cnpj_cpf: `${request.query.documento}`,
      },
      select: {
        cnpj_cpf: true,
        empregador: true,
        estabelecimento: true,
      },
    });

    const inconformidades = {
      tipos: [],
      nomes: [],
    };

    if (intersecao_soc_amb.length === 0 && trab_escravo === null)
      return {inconformidade: inconformidades};
    else {
      intersecao_soc_amb.forEach(intersect => {
        inconformidades.tipos.push(intersect.tipo);
        inconformidades.nomes.push(intersect.nome);
      });
      trab_escravo.forEach(te => {
        inconformidades.tipos.push('Trabalho escravo');
        inconformidades.nomes.push(
          `Empregador:${te.empregador}/Estabelecimento:${te.estabelecimento}`
        );
      });
      return {inconformidade: inconformidades};
    }
  }
}
