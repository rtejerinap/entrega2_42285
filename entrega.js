import {promises as fs} from 'fs';

const path = './products.json'

const getProducts = async () => {
    const prodsFromFile=JSON.parse(await fs.readFile(path, 'utf-8'))
    console.log(prodsFromFile)
}

const getProductById = async (id) =>{
    const prodsFromFile=JSON.parse(await fs.readFile(path, 'utf-8'))
    const product = prodsFromFile.find(product => product.ID === id)

    if (product) 
        console.log(product)
    else
        console.log( `Error! El ID: ${id} no existe`)
    ;
}

const deleteProduct  =async (id)=>{
    const prodsFromFile=JSON.parse(await fs.readFile(path, 'utf-8'))
    const product = prodsFromFile.find(product => product.ID === id)

    if (product) {
        await fs.writeFile(path,JSON.stringify(prodsFromFile.filter(prod => prod.ID!=id)))

    }
    else
        console.log( `Error! El ID: ${id} no existe`)
    ;
}


const updateProduct = async (id, product) =>{
    const prodsFromFile=JSON.parse(await fs.readFile(path, 'utf-8'))
    const index = prodsFromFile.findIndex(product => product.ID === id)

    if (index !=-1) {
        prodsFromFile[index].title=product.title
        prodsFromFile[index].stock=product.stock
        prodsFromFile[index].code=product.code
        prodsFromFile[index].description=product.description
        prodsFromFile[index].price=product.price
        prodsFromFile[index].img=product.img
        await fs.writeFile(path,JSON.stringify(prodsFromFile))


    }
    else
        console.log( `Error! El ID: ${id} no existe`)
    ;
}

const addProduct=async (producto)=>{
    const prodsFromFile=JSON.parse(await fs.readFile(path, 'utf-8'))
    const product = prodsFromFile.find(product => product.code === producto.code)
    let maxID = prodsFromFile.reduce((max, product) => product.ID > max ? product.ID : max, 0);


    if (product) 
        console.log(`Error! El producto con el código: ${product.code} ya existe`)
    else{
        if (  (producto.code =='' || producto.code==null || producto.code== undefined)||  (producto.stock =='' || producto.stock==null || producto.stock== undefined) || (producto.title =='' || producto.title==null || producto.title== undefined)|| (producto.description =='' || producto.description==null || producto.description== undefined) ||  (producto.price =='' || producto.price==null || producto.price== undefined) ||  (producto.img =='' || producto.img==null || producto.img== undefined) ) {
            //chequeo que existan todos los campos
            return 'Todos las propiedades son obligatorias'
        };
        producto.ID=maxID + 1
        prodsFromFile.push(producto)
        await fs.writeFile(path,JSON.stringify(prodsFromFile))
    }
        
    ;
    
}

const article = {
   
    code: 'articlulo1',
    stock: 100,
    title: 'Mate',
    description: 'Mate 3D Plímero',
    price: 1000,
    img: './imagen' 
};
const article2 = {
    code: 'articlulo2',
    stock: 200,
    title: 'Mate2',
    description: 'Mate 3D Plímero',
    price: 2000,
    img: './imagen' 
};
const article3 = {
    code: 'articlulo3',
    stock: null,
    title: 'Mate2',
    description: 'ff',
    price: 2000,
    img: './imagen' 
};


//const product = new ProductManager();
await addProduct(article);
 console.log('Listo productos:'+ getProducts() ); //listo productos
await addProduct(article2);
 console.log('Busco Producto 1'+ getProductById(1));
console.log('Busco Producto 3'+ getProductById(3));
await addProduct(article3);
console.log('Busco Producto 3'+ getProductById(3));
await updateProduct(2,{
    code: 'articlulo2',
    stock: 200,
    title: 'Mate2',
    description: 'Mate 3D Plímero',
    price: 66000,
    img: './imagen' 
});
console.log('Listo productos:'+ getProducts() ); //listo productos
await deleteProduct(3);
console.log('Listo productos:'+ getProducts() ); //listo productos

