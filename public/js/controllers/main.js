var mod=angular.module('areahopController', []);



	// inject the Todo service factory into our controller
	mod.controller('mainController', ['$scope','$http','Todos','Business','ShopArr', 'oiSelect', function($scope, $http, Todos ,Business,ShopArr, oiSelect) {
		$scope.formData = {};
		// This is our search object
		$scope.formData1={};
		$scope.isvalidTag={};
		// Multi autoselect for Controller
		/*$scope.version = oiSelect.version.full;
		$scope.shopArr={};
  
  $scope.shopArr = ShopArr.query().then(function(resp) {
  	//console.log("122"+resp);
        return resp; // success callback returns this

      });
  //console.log("123"+$scope.shopArr);
  
  $scope.bundle = [{
            "id": 5,
            "name": "shirt",
            "category": "clothes"
        },{
            "id": 2,
            "name": "shoes",
            "category": "shoes"
        }];
        //console.log("124"+$scope.bundle);
        */
		
  //console.log("123"+$scope.shopArr);
  
  //$scope.bundle = [];
        //console.log("124"+$scope.bundle);

	    


		// This is our AddBusiness object
		$scope.formData2={

		name:"",
		city:"",
		tag:[],
		category:[''],
		day:[''],
		time:'',
		opentime:'',
		closetime:'',
		timeC:'',
		service:[''],
		pincode:'',
		address:'',
		phone:'',
		
		error:'',
		image:''
		};
		//console.log(city);
		$scope.loading = true;
		$scope.version = oiSelect.version.full;
		$scope.shopArr={};
  
  $scope.shopArr = ShopArr.query().then(function(resp) {
  	//console.log("122"+resp);
        return resp; // success callback returns this

      });

		

		


		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		/*Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
				//console.log(data);
			}); */

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
						 // clear the form so our user is ready to enter another
						
						$scope.todos = data; // assign our new list of todos
					});
			}
		};
		$scope.addBusiness = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData2 != undefined) {
				$scope.loading = true;

				// Assigning day name to checkbox value(true false)
				for (var i = $scope.formData2.day.length - 1; i >= 0; i--) {
			if(i==6 && $scope.formData2.day[i]==true){
				$scope.formData2.day[i]="Saturday";
			}
			if(i==5&&$scope.formData2.day[i]==true){
				$scope.formData2.day[i]="Friday";
			}
			if(i==4&&$scope.formData2.day[i]==true){
				$scope.formData2.day[i]="Thursday";
			}
			if(i==3&&$scope.formData2.day[i]==true){
				$scope.formData2.day[i]="Wednesday";
			}
			if(i==2&&$scope.formData2.day[i]==true){
				$scope.formData2.day[i]="Tuesday";
			}
			if(i==1&&$scope.formData2.day[i]==true){
				$scope.formData2.day[i]="Monday";
			}
			if(i==0&&$scope.formData2.day[i]==true){
				$scope.formData2.day[i]="Sunday";
				
			}
		}

// Converting date to string and then slicing that string for forwarding to DB /		
console.log($scope.formData2.time);

var x=new Date();// creating a date object name x
x=$scope.formData2.time;


var temp = JSON.stringify(x);// converting x to the string
console.log(temp);

var temp2=temp.slice(12, 20);// 
$scope.formData2.opentime=temp2;

var x1=new Date();
x1=$scope.formData2.timeC;


var temp1 = JSON.stringify(x1);


var temp3=temp1.slice(12, 20);
$scope.formData2.closetime=temp3;
/*

// Now checking all the tag are valid or not!!
//for this first I call call all tag list from database and match them. 
//If all of them matched then addbusiness function will invoke otherwise error message wil be set 
                           $scope.count=0;
                          Todos.validateTag($scope.formData2)


                           .success(function(data)
                           {
	//$scope.loading=false;
	//$scope.formData2={}; 
	                            console.log(data);
	                      $scope.isvalidTag=data;
	                      console.log("here is from data "+data);
	                      
	                      for (var i=0;i<= $scope.formData2.tag.length-1;i++){


	                      for (var name in data){
	                      	console.log(" here is "+ data[name].tagName);
	                      	if($scope.formData2.tag[i]==data[name].tagName){
	                      		$scope.count++;
	                      		break;
	                      	}


	                      }}

	                      if($scope.count==$scope.formData2.tag.length){
	                      	console.log("here is from if");

	                      	*/


					console.log($scope.formData2);
					// converting object structure for tag name
					$scope.formData2.tag = angular.toJson($scope.formData2.tag);
					console.log($scope.formData2.tag);
				    $scope.formData2.tag = JSON.parse( $scope.formData2.tag);
				    for(var prop in $scope.formData2.tag) {
				    	var j=0;
				    	//if($scope.formData2.tag[prop].name!==undefined){
				    	
				    	$scope.formData2.tag[prop]=$scope.formData2.tag[prop].name;
				    	//j=j+1;
				   // }
				    	
    // `prop` contains the name of each property, i.e. `'code'` or `'items'`
    // consequently, `data[prop]` refers to the value of each property, i.e.
    // either `42` or the array
}

					console.log($scope.formData2.tag);

						Todos.addBusiness($scope.formData2)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {


						

						$scope.loading = false;
						$scope.formData2 = {};
						console.log("from addBusiness");
						 // clear the form so our user is ready to enter another
						 
						//$scope.todos = data; // assign our new list of todos
					});}
					/*
					else{

						$scope.message="Please enter a valid tag name!";
					}
					*/
			
                         
                       
		
                       
				// call the create function from our service (returns a promise object)
				
		};
		$scope.searchTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData1.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.search($scope.formData1)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData1 = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
						console.log("i am from search"+data);
					});
			}
		};
		$scope.getbusinessdetail = function(id) {
			$scope.loading = true;

			Business.search1(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					console.log(data);
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
		this.tagData = {};
	this.tagDetails = {};
	$scope.visible = false;
    $scope.visibleResData = false;
    $scope.master = {};



    $scope.productResData = {};

	// Any function returning a promise object can be used to load values asynchronously
	var that = this;
	this.getTag = function(val) {
		//console.log("here value is ="+ val);
		console.log("I am from getProduct");
		return $http.get('/api/searchproduct', {
		  params: {
			product: val,
			sensor: false
		  }
		}).then(function(response){
			return response.data.map(function(item){
				that.tagDetails = item;
				console.log("fro  item" +item);
				return item.tagName;
			});	
		});
	  };
	  this.displayTag = function(product){
		console.log("I am from displayproduct");

		
		$scope.formData2.tag.push(product);
		console.log("I am from displayproduct" +$scope.formData2.tag);
		$scope.visible = !$scope.visible;

       
        $scope.visibleResData = false;

	 };



		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}]);
	
	

var productModule=mod;

	

mod.controller('HomeController', function ($scope, $http, $log,Todos) {
	this.productData = {};
	this.productDetails = {};
	$scope.visible = false;
    $scope.visibleResData = false;
    $scope.master = {};
$scope.searchproduct={name:[]};


    $scope.productResData = {};

	// Any function returning a promise object can be used to load values asynchronously
	var that = this;
	this.getProduct = function(val) {
		//console.log("here value is ="+ val);
		console.log("I am from getProduct");
		return $http.get('/api/searchproduct', {
		  params: {
			product: val,
			sensor: false
		  }
		}).then(function(response){
			return response.data.map(function(item){
				that.productDetails = item;
				$scope.todos=item;
				console.log("I am from getProduct deeper" +item);
				return item.name;
			});	
		});
	  };
	 
	this.displayTag = function(product){
		
		console.log("I am from displayproduct");
		$scope.searchproduct.name.push(product);
		console.log("I am from displayproduct"+$scope.searchproduct.name );

		
		
		$scope.visible = !$scope.visible;
       
        $scope.visibleResData = false;

	 };

	  this.updateProduct = function() {
	  	console.log("I am from update updateProduct");
		$scope.submitted = true;
		$scope.product = {
				_id: this.productData._id,
				productID: this.productData.product_id,
				name: this.productData.name,
				quantity: this.productData.quantity,
				costprice: this.productData.costPrice,
				sellingprice: this.productData.sellingPrice,
			};
		var jdata = 'mydata='+JSON.stringify($scope.product);
		console.log(jdata);
		
		$http({
			method: 'POST',
			url: '/api/updateProduct',
			data:  jdata ,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		})
		.success(function(data) {

			$scope.productResData = data;
            // Hide form
            $scope.visible = !$scope.visible;
            $scope.searchProduct = null;
            $scope.visibleResData = !$scope.visibleResData;
		})
		.error(function(data) {
			$scope.productData = data || "Request failed";
			console.log($scope.productData);
		});
		

   //     console.log(this.productData);
   //     this.productData = angular.copy($scope.master);

		return false;

	    };

 
});

productModule.controller('EditController', function ($scope, $http) {
	$scope.formData = {};
	// when submitting the add form, send the text to the node API
	var method = 'POST';
	$scope.productData = "";
	
	// when landing on the page, get all todos and show them
	$http.get('/api/product')
		.success(function(data) {
			$scope.productData = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.addProduct = function() {
		// Set the 'submitted' flag to true
        	$scope.submitted = true;
		$scope.product = {
				productID: this.formData.productID,
				name: this.formData.name,
				quantity: this.formData.quantity,
				costprice: this.formData.costprice,
				sellingprice: this.formData.sellingprice,
			};

		console.log($scope.product);
		var jdata = 'mydata='+JSON.stringify($scope.product);
		console.log(jdata);
		
		$http({
			method: method,
			url: '/api/product',
			data:  jdata ,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		})
		.success(function(data) {
			$scope.productData = data;
			console.log($scope.productData);
		})
		.error(function(data) {
			$scope.productData = data || "Request failed";
			console.log($scope.productData);
		});
		
		
		return false;
	};

	// delete a todo after checking it
	$scope.deleteProduct = function(id) {
		$http.delete('/api/product/' + id)
			.success(function(data) {
				$scope.productData = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	
	$scope.reset = function() {
		$scope.$broadcast('show-errors-reset');
		$scope.formData = { productID: '', name: '', quantity : '', costprice: '', sellingprice:'' };
	}
});
	
   