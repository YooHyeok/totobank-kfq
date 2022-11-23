package com.example.bank;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.bank.entity.Account;
import com.example.bank.repository.AccountRepository;




@ExtendWith(SpringExtension.class)
@SpringBootTest
class BankApplicationTests {

	@Autowired
	AccountRepository accountRepository;

	@Test
	void addAccount() {
		accountRepository.save(new Account("10001","hong","1234","VIP",0));
	}
	
	@Test
	void accountInfo() {
		System.out.println(accountRepository.findById("10001"));
	}

}
