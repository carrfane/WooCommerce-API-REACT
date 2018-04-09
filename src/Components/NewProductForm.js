import React, { Component } from 'react';

class NewProductForm extends Component {
  state = {
	name: "",
	type: "simple",
	price: "",
	regular_price: "",
	description: "",
	slug: "",
	status: "publish",
	tax_status: "taxable",
	tax_class: "",
	manage_stock: true,
	stock_quantity:0,
	attributes: [{
		name: "Marca",
		visible: true,
		options: []
	},
	{
		name: "Cepa",
		visible: true,
		options: []
	},
	{
		name: "Pais",
		visible: true,
		options: []
	},
	{
		name: "Linea",
		visible: true,
		options: []
	},
	],
	meta_data: [
	  {
	  	key: "_role_based_price",
	  	value: {
	  	  Joven:{
          regular_price:"",
          selling_price:""
        },
        reserva:{
          regular_price:"",
          selling_price:""
        },
        clasico:{
          regular_price:"",
          selling_price:""
        },
        Icono:{
           regular_price:"",
           selling_price:""
        }
	  }
	  }	
	]
};

	generalHandler(){
    let generalParams = [];
	};

  submitHandler(event){
    event.preventDefault();
    const baseURL = 'https://dev.everwines.cl/wp-json/wc/v2/products/?consumer_key=ck_83ff78b450ba643882d724bdbc1f06c7f7c18b94&consumer_secret=cs_1c8f1dfb9347e036aeafbd3f52060ec6598bb946',
          baseURL2 = 'https://jsonplaceholder.typicode.com/posts'
    fetch(baseURL, {
    	method:"POST",
    	body: JSON.stringify(this.state)
    }).then(res => res.json()).then(data => {
    	console.log(data);
    	console.log(this.state)
    })
    //console.log(JSON.stringify(this.state));
  };

  nameHandler(event){
    const name = event.target.value;
    this.setState({ name: name, slug: name.toLowerCase().replace(/ /g, "-") }, console.log(JSON.stringify(this.state)));
  }

  render(){
    return(
    	<form onSubmit={this.submitHandler.bind(this)}>
    	  <label htmlFor="name">
    	  	Nombre del Producto:
    	  	<input className="form-control" name="name" required onChange={this.nameHandler.bind(this)} value={this.state.name}/>
    	  </label>
    	  <label htmlFor="price">
    	  	Precio:
    	  	<input className="form-control" name="price" required />
    	  </label>
    	  <label htmlFor="description">
    	  	Descripcion:
    	  	<textarea className="form-control" name="description" />
    	  </label>
    	  <label htmlFor="tax_class">
    	  	Tipo de Impuesto:
    	  	<select className="form-control" name="tax_class">
    	  	  <option value="IVA + ILA VINOS">IVA + ILA VINOS</option>
    	  	  <option value="IVA + ILA LICORES">IVA + ILA LICORES</option>
    	  	  <option value="IVA + ILA AGUAS">IVA + ILA AGUAS</option>
    	  	</select>
    	  </label>
    	  <label htmlFor="stock_quantity">
    	  	Cantidad en Stock:
    	  	<input className="form-control" name="stock_quantity" required />
    	  </label>
    	  <input type="submit" value="Guardar Producto" />
    	</form>
    )
  }
 }

export default NewProductForm;