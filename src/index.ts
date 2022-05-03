import { port } from "./config"
import app from "./app"


try{
    app.listen(port)
    console.log(`Express server has started on port ${port}. Open http://localhost:${port} to see results`)
}
catch{(error) => {console.log(error)}}


