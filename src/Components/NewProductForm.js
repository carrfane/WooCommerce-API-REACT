import React, { Component } from 'react';
import CsvParse from '@vtex/react-csv-parse'
class NewProductForm extends Component {
  state = {
	  name: "",
	  type: "simple",
	  regular_price: "",
	  description: "",
	  status: "publish",
	  tax_status: "taxable",
	  tax_class: "",
	  manage_stock: true,
	  stock_quantity:0,
	  marca:"",
	  cepa: "",
	  linea:"",
		pais:"",
		joven:"",
		icono:"",
		reserva:"",
		gran_reserva:"",
		clasico:"",
		featured: "",
		categories:""
};

  componentWillMount(){

  }

  submitHandler(event){
		document.getElementById("newProduct").reset();
    event.preventDefault();
    const baseURL = 'https://dev.everwines.cl/wp-json/wc/v2/products/?consumer_key=ck_83ff78b450ba643882d724bdbc1f06c7f7c18b94&consumer_secret=cs_1c8f1dfb9347e036aeafbd3f52060ec6598bb946',
          baseURL2 = 'https://jsonplaceholder.typicode.com/posts'
    fetch(baseURL, {
    	method:"POST",
			body: JSON.stringify(this.state),
			headers: { "Content-Type": "application/json" }
    }).then(res => res.json()).then(data => {
			console.log(JSON.stringify(data));
    })
  };

  outterKeysHandler(event){
		this.setState({ [event.target.name]: event.target.value });
		console.log(this.state)
  }

	handleData(data) {
		document.getElementById("loader").classList.add("loader");
		const totalSteps = data.length;
		let currentStep = 0;
	  data.map( productInfo => {
	    let product = {
			name:"",
			slug:"",
			type:"simple",
			status:"publish",
			featured:"",
			catalog_visibility:"visible",
			description:"",
			regular_price:"",
			tax_status:"taxable",
			tax_class:"",
			manage_stock:true,
			stock_quantity:0,
			categories:[
			  {
				id:0
			  }
			],
			images:[
			  {
				src:"http://zazsupercentro.com/wp-content/uploads/2017/07/imagen-no-disponible.png",
				position:0
			  }
			],
			attributes:[
			  {
				id:30,
				name:"Marca",
				position:0,
				visible:true,
				variation:false,
				options:[]
			  },
			  {
				id:31,
				name:"Cepa",
				position:1,
				visible:true,
				variation:false,
				options:[]
			  },
			  {
				id:33,
				name:"Pa\u00eds",
				position:2,
				visible:true,
				variation:false,
				options:[]
			  },
			  {
				id:32,
				name:"L\u00ednea",
				position:6,
				visible:true,
				variation:false,
				options:[]
			  }
			],
			meta_data:[
			  {
				key:"_rewardsystem_buying_reward_points",
				value:"yes"
			  },
			  {
				key:"_rewardsystem_assign_buying_points",
				value:"60"
			  },
			  {
				key:"_enable_role_based_price",
				value:"1"
			  },
			  {
				key:"_role_based_price",
				value:{
				  Joven:{
					regular_price:"5800",
					selling_price:""
				  },
				  reserva:{
					regular_price:"5700",
					selling_price:""
				  },
				  clasico:{
					regular_price:"5600",
					selling_price:""
				  },
				  Icono:{
					regular_price:"5500",
					selling_price:""
				  },
				  "Gran-Reserva":{
					regular_price:"2500",
					selling_price:""
				  }
				}
			  }
			]
		  };
	let categoryID;
	if(productInfo.categories === "ESPUMANTE") {
		categoryID = 430;
	}

	else if ( productInfo.categories === "VINO" ) {
		categoryID = 431;
	}

	else if ( productInfo.categories === "AGUA" ) {
		categoryID = 429;
	}

	else if ( productInfo.categories === "TEQUILA" ) {
		categoryID = 433;
	}

	else if ( productInfo.categories === "PISCO" ) {
		categoryID = 434;
	}

	else if ( productInfo.categories === "GIN" ) {
		categoryID = 468;
	}

	else if ( productInfo.categories === "Amaretto" ) {
		categoryID = 470;
	}

	else if ( productInfo.categories === "Limoncello" ) {
		categoryID = 471;
	}

	else if ( productInfo.categories === "Raspberry" ) {
		categoryID = 472;
	}

	else if ( productInfo.categories === "VODKA" ) {
		categoryID = 469;
	}

	else if ( productInfo.categories === "BRANDY" ) {
		categoryID = 493;
	}

	else if ( productInfo.categories === "LICOR" ) {
		categoryID = 533;
	}

	else if ( productInfo.categories === "Chartreuse" ) {
		categoryID = 505;
	}

	else if ( productInfo.categories === "WHISKY" ) {
		categoryID = 503;
	}

	else if ( productInfo.categories === "RON" ) {
		categoryID = 504;
	}

	else {
		categoryID = 533;
	}

	
	  product.name = productInfo.name;
	  product.slug = productInfo.name.toLowerCase().replace(/ |ü|é|á|í|ó|ú|ñ|Ñ|¿|¡/g, "-");
	  product.featured = !!productInfo.featured;
	  product.description = productInfo.description;
	  product.regular_price = productInfo.regular_price
	  product.tax_class = productInfo.tax_class
		product.stock_quantity = productInfo.stock_quantity
		product.categories = [{ id: categoryID}];
		product.attributes.forEach( (element, index) => {
			switch(index) {
				case 0:
				  element.options.push(productInfo.marca)
					break;
				case 1:
				  element.options.push(productInfo.cepa)
					break;
				case 2:
				  element.options.push(productInfo.pais)
					break;
				case 3:
				  element.options.push(productInfo.linea)
				  break;
			}
		} )
	  product.meta_data.forEach( (element, index) => {
			if ( index === 1 ) {
				const price = parseFloat(productInfo.regular_price),
							conversion_rate = 100,
							points = Math.round(price/conversion_rate);
				element.value = points;
			}
      if ( index === 3 ) {
				element.value.Joven.regular_price = productInfo.regular_price
				element.value.reserva.regular_price = Math.round(productInfo.regular_price*0.9).toString()
				element.value.clasico.regular_price = productInfo.regular_price
				element.value.Icono.regular_price = Math.round(productInfo.regular_price*0.8).toString()
				element.value["Gran-Reserva"].regular_price = Math.round(productInfo.regular_price*0.85).toString()
			}
	  })
		
		setTimeout(function()  {
      fetch('https://dev.everwines.cl/wp-json/wc/v2/products/?consumer_key=ck_83ff78b450ba643882d724bdbc1f06c7f7c18b94&consumer_secret=cs_1c8f1dfb9347e036aeafbd3f52060ec6598bb946',{
				method:"POST",
				body:JSON.stringify(product),
				headers: { "Content-Type": "application/json" }
			}).then(res => res.json()).then(data => {
				console.log(data)
				currentStep += 1;
				if (currentStep === totalSteps) {
					document.getElementById("loader").classList.remove("loader");
				}
			})
		},8000)
	} )
	}
  render(){
		const csvKeys = Object.keys(this.state);
    return(
			<div>
				<form onSubmit={this.submitHandler.bind(this)} id="newProduct">
					<label htmlFor="name">
						Nombre del Producto:
						<input className="form-control" name="name" required onChange={this.outterKeysHandler.bind(this)} value={this.state.name}/>
					</label>
					<label htmlFor="regular_price">
						Precio:
						<input className="form-control" name="regular_price" required onChange={this.outterKeysHandler.bind(this)} value={this.state.regular_price} />
					</label>
					<label htmlFor="description">
						Descripcion:
						<textarea className="form-control" name="description" onChange={this.outterKeysHandler.bind(this)} value={this.state.description} />
					</label>
					<label htmlFor="tax_class">
						Tipo de Impuesto:
						<select className="form-control" name="tax_class" onChange={this.outterKeysHandler.bind(this)} value={this.state.tax_class} >
							<option>Seleccine tipo de Impuesto</option>
							<option value="IVA + ILA VINOS">IVA + ILA VINOS</option>
							<option value="IVA + ILA LICORES">IVA + ILA LICORES</option>
							<option value="IVA + ILA AGUAS">IVA + ILA AGUAS</option>
						</select>
					</label>
					<label htmlFor="stock_quantity">
						Cantidad en Stock:
						<input className="form-control" name="stock_quantity" required onChange={this.outterKeysHandler.bind(this)} value={this.state.stock_quantity} />
					</label>
					<input type="submit" value="Guardar Producto" />
				</form>
				<div className="card">
				  <div className="card-header">
				    <h5>Cargador de CSV</h5>
				  </div>
				  <div className="card-body">
				    <CsvParse
					  keys={csvKeys}
				  	  separators={[',', ';']}
					  onDataUploaded={this.handleData}
					  render={onChange => <input type="file" onChange={onChange} />}
				    />
				  </div>
				</div>
			</div>
    )
  }
 }

export default NewProductForm;