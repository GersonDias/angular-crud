using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using Server;
using Server.Models;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Http.Cors;

namespace Server.Controllers
{
    [EnableCors(origins:"http://localhost:3000", headers:"*", methods:"*")]
    public class UsersController : ApiController
    {
        private DbContext db = new DbContext();

        public JsonResult<UsersReturn> Get()
        {
            var users = new UsersReturn
            {
                data = new List<Users>()
                {
                                    new Users() {FirstName = "Gerson", LastName = "Dias", Country = "Brasil", BirthDate = new DateTime(1986,8,31).ToShortDateString(), Email = "contato@gersondias.net"},
                new Users() {FirstName = "Thamyra", LastName = "Miranda", Country = "Brasil", BirthDate = new DateTime(1990,1,13).ToShortDateString(), Email = "contato@gersondias.net"}

                }
            };

            return Json(users);
        }
    }

    public class UsersReturn
    {
        public List<Users> data { get; set; }
    }
}

