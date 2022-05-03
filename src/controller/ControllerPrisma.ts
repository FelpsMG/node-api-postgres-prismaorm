
import { NextFunction, Request, Response } from "express"
import * as fs from 'fs'
import { socioambientais } from "@prisma/client"
import prisma from "../db/PrismaConn"

export class ControllerPrisma {

    async all(request: Request, response: Response, next: NextFunction) {
        // return prisma.$queryRaw`SELECT * FROM public.user`
        return await prisma.user.findMany()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const found = await prisma.user.findUnique({
            where:{
                id: parseInt(request.params.id)
            } 
        })
        if (!found) throw Error("user does not exist")
        return found
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return prisma.user.create({data: request.body})
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const userToRemove = await prisma.user.findUnique({ where: {id: parseInt(request.params.id)} })
        if (!userToRemove) throw Error("user does not exist")
        await prisma.user.delete({ where: {id: parseInt(request.params.id)} })
        return
    }

    async find_intersection(request: Request, response: Response, next: NextFunction) {

        const point = {
            type: "Point",
            coordinates: [request.query.longitude, request.query.latitude],
        }

        let origin = JSON.stringify(point)
        
        const intersection = await prisma.$queryRaw<socioambientais[]>`
                SELECT tipo, nome FROM socioambientais 
                WHERE st_intersects(socioambientais.geom, ST_SetSRID(ST_GeomFromGeoJSON(${origin}), ST_SRID(socioambientais.geom)))`
        let inconformidades = {
            tipos: [],
            nomes: []
        }

        if (intersection.length === 0) return { "conformidade": "Conforme!" }
        else {
            intersection.forEach(intersect => {
                inconformidades.tipos.push(intersect.tipo)
                inconformidades.nomes.push(intersect.nome)
            })
            return { "conformidade": inconformidades }
        }
    }

    async get_report(request: Request, response: Response, next: NextFunction) {
        const file = `F:/code/mapa-script/reports/relatorios/${request.query.id_proposta}.pdf`

        if (!fs.existsSync(file)) throw Error('Arquivo não encontrado!')
        else {
            response.contentType("application/pdf");
            response.send(fs.readFileSync(file))
        }
    }
}