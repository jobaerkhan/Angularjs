
app.controller('ProductCtrl', ['$scope', 'CrudService',
    function ($scope, CrudService) {

        // Base Url 
        var baseUrl = '/api/Product/';
        $scope.Message = "Save";
        $scope.btnText = "Save";
        $scope.ProductID = 0;
        $scope.price = 0;
        $scope.createdDate = new Date();
        $scope.SaveUpdate = function () {
            var Product = {
                ProductName: $scope.productName,
                Category: $scope.category,
                Price: $scope.price,
                CreatedDate: $scope.createdDate,
                ProductID: $scope.productID
            }
            if ($scope.btnText == "Save") {
                var apiRoute = baseUrl + 'SaveProduct/';
                var saveProduct = CrudService.post(apiRoute, Product);
                saveProduct.then(function (response) {
                    if (response.data != "") {
                        alert("Data Save Successfully");
                        $scope.GetProducts();
                        $scope.Clear();

                    } else {
                        alert("Some error");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                });
            }
            else {
                var apiRoute = baseUrl + 'UpdateProduct/';
                var UpdateProduct = CrudService.put(apiRoute, Product);
                UpdateProduct.then(function (response) {
                    if (response.data != "") {
                        alert("Data Update Successfully");
                        $scope.GetProducts();
                        $scope.Clear();

                    } else {
                        alert("Some error");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                });
            }
        }


        $scope.GetProducts = function () {
            var apiRoute = baseUrl + 'GetProducts/';
            var Product = CrudService.getAll(apiRoute);
            Product.then(function (response) {
                debugger
                $scope.products = response.data;

            },
            function (error) {
                console.log("Error: " + error);
            });


        }
        $scope.GetProducts();

        $scope.GetProductByID = function (dataModel) {
            debugger
            var apiRoute = baseUrl + 'GetProductByID';
            var Product = CrudService.getbyID(apiRoute, dataModel.ProductID);
            Product.then(function (response) {
                $scope.productID = response.data.ProductID;
                $scope.productName = response.data.ProductName;
                $scope.category = response.data.Category;
                $scope.price = response.data.Price;
                $scope.createdDate = response.data.CreatedDate;
                $scope.btnText = "Update";
            },
            function (error) {
                console.log("Error: " + error);
            });
        }

        $scope.DeleteProduct = function (dataModel) {
            debugger
            var apiRoute = baseUrl + 'DeleteProduct/' + dataModel.ProductID;
            var deleteProduct = CrudService.delete(apiRoute);
            deleteProduct.then(function (response) {
                if (response.data != "") {
                    alert("Data Delete Successfully");
                    $scope.GetProducts();
                    $scope.Clear();

                } else {
                    alert("Some error");
                }

            }, function (error) {
                console.log("Error: " + error);
            });
        }

        $scope.Clear = function () {
            $scope.ProductID = 0;
            $scope.productName = "";
            $scope.category = "";
            $scope.price = 0;
            $scope.createdDate = new Date();
            $scope.btnText = "Save";
        }

    }]);