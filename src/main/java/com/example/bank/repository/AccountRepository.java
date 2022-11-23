package com.example.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.bank.entity.Account;

public interface AccountRepository extends JpaRepository<Account, String> { //id는 String타입
	
	
//	  @Modifying
//	  @Query("update a from Account a where a.balance = a.balance + :acc.balance where a.id = :acc.id")
//	   public <S extends T> S depositBalance(@Param("acc") Account acc);
	 
	
}
