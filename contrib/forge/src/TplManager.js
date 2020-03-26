const fs = require('fs')
const glob = require('glob')

class TplManager{

    run(from, to, data){
        this.from = from
        this.to = to;
        this.data = data;

        this.treatItem(this.from)
    }

    treatItem(item){
        if( fs.lstatSync(item).isDirectory() ){
            this.treatDir(item)
        }
        else{
            this.treatFile(item)
        }
    }

    treatDir(dir){
        glob.glob(`${dir}/*`, (er, files)=>{
            files.map( item => {
                this.treatItem(item)
            })
        })
    }

    treatFile(file){
        fs.readFile(file, "utf8", (err, data)=>{
            let destination = file.replace(this.from, '')
            destination = this.replace(this.to + destination);
            
            // create directory.
            fs.mkdir( destination.split('/').slice(0, -1).join('/'),{ recursive: true },  (err)=> {
                if(!err){
                    fs.writeFile(destination, this.replace(data), (err) => {
                        console.log('Create file :', destination);
                    })
                }
            } )
        });
    }


    /**
     * Replace data in string.
     * @param {*} string 
     */
    replace(string){
        let result = string
        for( let i in this.data){            
            result = result.split(i).join(this.data[i])
        }

        return result
    }
}

module.exports = TplManager