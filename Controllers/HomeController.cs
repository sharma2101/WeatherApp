using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using WeatherApp.Models;

namespace WeatherApp.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }
        
        //
        // GET: /Home/Edit

        public ActionResult Edit(string lat, string lon)

        {
            double temperature = 0.0;
            string summary = null;
            string current = null;
            string picture = null;
            string timezone = null;

            JObject data = null;
            try
            {
                string apiKey = "https://api.forecast.io/forecast/b7818996d5765c100bf4d386f75a1db7/";
                string url = apiKey + lat+ "," + lon;
                string results = "";

                using (WebClient wc = new WebClient())
                {
                    results = wc.DownloadString(url);
                }

                JObject dataObject = JObject.Parse(results);

                WeatherInfoModel modelObject = new WeatherInfoModel();

                data = modelObject.getData(dataObject);
                temperature = (double)data["temp"];
                summary = (string)data["WeatherSummary"];
                current = (string)data["time"];
                picture = (string)data["imageName"];
                timezone = (string)data["zone"];

                Console.WriteLine(data);
                Console.WriteLine(data);
                Console.WriteLine(data);
                
            }
            catch (Exception e)
            {
                Response.Write(e.StackTrace);
               
            }

            return Json(new { temp = temperature, WeatherSummary = summary, time = current, zone = timezone, imageName = picture }, JsonRequestBehavior.AllowGet);

        
       
        }

        // GET: /Home/Create
        public ActionResult Create()
        {
            return Json(new { foo = "bar", baz = "Blech" }, JsonRequestBehavior.AllowGet);
        }

      
    }
}
