using CRUDinAngularjs.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace CRUDinAngularjs.api
{
        [RoutePrefix("api/Product")]
        public class ProductController : ApiController
        {
            // // ProductDBEntities object point
            ProductDBEntities dbContext = null;
            // Constructor 
            public ProductController()
            {
                // create instance of an object
                dbContext = new ProductDBEntities();
            }


            [ResponseType(typeof(tblProduct))]
            [HttpPost]
            public HttpResponseMessage SaveProduct(tblProduct asproduct)
            {
                int result = 0;
                try
                {
                    dbContext.tblProducts.Add(asproduct);
                    dbContext.SaveChanges();
                    result = 1;
                }
                catch (Exception e)
                {

                    result = 0;
                }

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }


            [ResponseType(typeof(tblProduct))]
            [HttpPut]
            public HttpResponseMessage UpdateProduct(tblProduct asproduct)
            {
                int result = 0;
                try
                {
                    dbContext.tblProducts.Attach(asproduct);
                    dbContext.Entry(asproduct).State = EntityState.Modified;
                    dbContext.SaveChanges();
                    result = 1;
                }
                catch (Exception e)
                {

                    result = 0;
                }

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            [ResponseType(typeof(tblProduct))]
            [HttpDelete, Route("DeleteProduct/{id}")]
            public HttpResponseMessage DeleteProduct(int id)
            {
                int result = 0;
                try
                {
                    var Product = dbContext.tblProducts.Where(x => x.ProductID == id).FirstOrDefault();
                    dbContext.tblProducts.Attach(Product);
                    dbContext.tblProducts.Remove(Product);
                    dbContext.SaveChanges();
                    result = 1;
                }
                catch (Exception e)
                {

                    result = 0;
                }

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }

            [Route("GetProductByID/{ProductID:int}")]
            [ResponseType(typeof(tblProduct))]
            [HttpGet]
            public tblProduct GetProductByID(int ProductID)
            {
                tblProduct asproduct = null;
                try
                {
                    asproduct = dbContext.tblProducts.Where(x => x.ProductID == ProductID).SingleOrDefault();

                }
                catch (Exception e)
                {
                    asproduct = null;
                }

                return asproduct;
            }

            [ResponseType(typeof(tblProduct))]
            [HttpGet]
            public List<tblProduct> GetProducts()
            {
                List<tblProduct> Products = null;
                try
                {
                    Products = dbContext.tblProducts.ToList();

                }
                catch (Exception e)
                {
                    Products = null;
                }

                return Products;
            }
        }
    }
