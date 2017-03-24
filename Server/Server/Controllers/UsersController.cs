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
using System.Net.Http;

namespace Server.Controllers
{
    [EnableCors(origins: "http://localhost:3002", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        private DbContext db = new DbContext();

        public JsonResult<UsersReturn> Get()
        {
            var users = new UsersReturn
            {
                data = db.Users.ToList()
            };

            return Json(users);
        }

        public ResponseMessageResult Delete([FromUri]int[] ids)
        {
            db.Users.RemoveRange(db.Users.Where(x => ids.Contains(x.Id)));

            db.SaveChanges();

            return ResponseMessage(new System.Net.Http.HttpResponseMessage(HttpStatusCode.OK));
        }

        public ResponseMessageResult Put([FromBody] User user)
        {
            try
            {
                var userToModify = db.Users.Find(user.Id);

                userToModify.FirstName = user.FirstName;
                userToModify.LastName = user.LastName;
                userToModify.Email = user.Email;
                userToModify.Country = user.Country;
                userToModify.BirthDate = user.BirthDate;

                db.SaveChanges();

                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.OK));
            }
            catch (Exception err)
            {
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.InternalServerError) { Content = new StringContent(err.Message) });
            }
        }

        public ResponseMessageResult Post([FromBody] User user)
        {
            db.Users.Add(user);

            db.SaveChanges();

            return ResponseMessage(new HttpResponseMessage(HttpStatusCode.OK));
        }
    }

    public class UsersReturn
    {
        public List<User> data { get; set; }
    }
}

