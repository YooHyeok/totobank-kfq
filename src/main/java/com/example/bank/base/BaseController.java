package com.example.bank.base;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

@Controller
public class BaseController {
    protected final Logger LOGGER = LoggerFactory.getLogger(getClass());
}