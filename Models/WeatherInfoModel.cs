using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace WeatherApp.Models
{
    public class WeatherInfoModel
    {
        

        public JObject getData(JObject dataObject)
        {
            

             double temperature =(double) dataObject["currently"]["temperature"];
             string summary = (string)dataObject["currently"]["summary"];

            long unixTime = (long)dataObject["currently"]["time"];
            DateTime current = DateTime.Now;
            string timezone = (string)dataObject["timezone"];

           
            long sunrise = (long)dataObject["daily"]["data"][0]["sunriseTime"];
            long sunset = (long)dataObject["daily"]["data"][0]["sunsetTime"]; 
            string icon = (string)dataObject["currently"]["icon"];
            string picture = null;
            if (icon.Contains("clear"))
                			{
                				picture= "clear";
                			}
                			else if (icon.Contains("cloudy"))
                			{
                				picture= "cloudy";
                			}
                			else if (icon.Contains("rain"))
                			{
                				picture= "rain";
                			}
                			else if (icon.Contains("sleet"))
                			{
                				picture= "sleet";
                			}
                			else if (icon.Contains("snow"))
                			{
                				picture= "snow";
                			}
                			else
                			{
                				picture= "unknown";
                			}

                			if(picture.Equals("unknown"))
                			{

                                picture = "unknown.png";
                			}

                			else
                			{


                                if (unixTime >= sunrise && unixTime <= sunset)
                                {

                                    picture = picture + "Day" + ".png";
                                }

                                else
                                {
                                    picture = picture + "Night" + ".png";
                                }
                			}

            

                            string jsonSt = "{'temp' : '"+temperature+"','WeatherSummary' :'"+summary+"','time' :'"+current+"','zone' :'"+timezone+"','imageName':'"+picture+"'}";
                           
                            JObject finalJson = JObject.Parse(jsonSt);

                        
                           
                            return finalJson;

                            
        }
    }
}



