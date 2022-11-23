package com.example.bank.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bank.base.BaseController;
import com.example.bank.entity.Account;
import com.example.bank.service.AccountService;

@RestController
public class AccountController extends BaseController{

	@Autowired
	AccountService accountService;

	@PostMapping("/makeaccount")
	public ResponseEntity<String> makeAccount(Account acc) {
		ResponseEntity<String> res = null;
		System.out.println(acc);
		try {
			accountService.makeAccount(acc);
			res = new ResponseEntity<String>("success", HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			res = new ResponseEntity<String>("error", HttpStatus.BAD_REQUEST);
		}
		return res;
	}

	@PostMapping("/accinfo")
	public ResponseEntity<Account> accountInfo(@RequestParam("id") String id) {
		ResponseEntity<Account> res = null;
		try {
			Account acc = accountService.accountInfo(id);
			res = new ResponseEntity<Account>(acc, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			res = new ResponseEntity<Account>(new Account(), HttpStatus.BAD_REQUEST); //실패시 빈 객체 값 반환
		}
		return res;
	}

	@PostMapping("/existsid")
	public ResponseEntity<Boolean> isExistsById(@RequestParam("id") String id) {
		ResponseEntity<Boolean> res = null;
		//계좌번호가 존재할 때 : "true", 존재하지 않을 때 : "false"
		try {
			System.out.println("idid : "+id);

			if(!id.equals(null) || !id.equals("")) {
				Boolean exsists = accountService.isExistsById(id);
				res = new ResponseEntity<Boolean>(exsists, HttpStatus.OK);

			}
		} catch(Exception e) {
			e.printStackTrace();
			res = new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
		}
		return res;
	}

	@PostMapping("/deposit")
	public ResponseEntity<Integer> deposit(String id, Integer money) {
		System.out.println("deposit 호출");
		ResponseEntity<Integer> res = null;
		try {
			Integer balance = accountService.deposit(id, money);

			res = new ResponseEntity<Integer>(balance, HttpStatus.OK);
		} catch(Exception e) {
			res = new ResponseEntity<Integer>(-1, HttpStatus.BAD_REQUEST);
		}
		return res;
	}

	@PostMapping("/withdraw")
	public ResponseEntity<Integer> withdraw(String id, Integer money) {
		ResponseEntity<Integer> res = null;
		try {
			Integer balance = accountService.withdraw(id, money);

			res = new ResponseEntity<Integer>(balance, HttpStatus.OK);
		} catch(Exception e) {
			res = new ResponseEntity<Integer>(-1, HttpStatus.BAD_REQUEST);
		}
		return res;
	} 

	@PostMapping("/transfor")
	public ResponseEntity<Map> transfor(String sid, String rid, Integer money) {
		ResponseEntity<Map> res = null;
		try {
			Map result = accountService.transfor(sid, rid, money);
			System.out.println(result);
			res = new ResponseEntity<Map>(result, HttpStatus.OK);
		} catch(Exception e) {
			res = new ResponseEntity<Map>(null, HttpStatus.BAD_REQUEST);
		}
		return res;
	} 

	@PostMapping("/transfor2")
	public ResponseEntity<Integer> transfor2(String sid, String rid, Integer money) {
		ResponseEntity<Integer> res = null;
		try {
			Integer balance = accountService.transfor2(sid, rid, money);
			res = new ResponseEntity<Integer>(balance, HttpStatus.OK);
		} catch(Exception e) {
			res = new ResponseEntity<Integer>(-1, HttpStatus.BAD_REQUEST);
		}
		return res;
	} 
}
