package edu.nyu.react.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
 
//    @RequestMapping(value = "/")
//    public String index() {
//        return "index.html";
//    }

    @RequestMapping(value = "/")
    public String coin() {
        return "coin.html";
    }


    @RequestMapping(value = "/hello")
    public String index() {
        return "coins.html";
    }
}
