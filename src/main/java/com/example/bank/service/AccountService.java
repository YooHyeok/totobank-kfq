package com.example.bank.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.bank.entity.Account;
import com.example.bank.repository.AccountRepository;

@Service(value="AccountService") //명시적으로 선언해준다. (Bean의 이름을 명시적으로 강하게 인식시켜준다)
@Transactional(readOnly = true) //기본적으로 읽기전용 - select쿼리가 많을경우 사용
public class AccountService {
	
	@Autowired
	AccountRepository accountRepository;
	
	/**
	 * 계좌개설
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@Transactional(readOnly = false) //save() - Inert문
	public void makeAccount(Account acc) throws Exception {
		acc.setBalance(0);
		accountRepository.save(acc);
	}
	
	/**
	 * 계좌조회
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Account accountInfo(String id) throws Exception {
		Optional<Account> oacc = accountRepository.findById(id);
		if(oacc.isPresent()) {
			return oacc.get();
		} else {
			throw new Exception();
		}
		
	}
	/**
	 * 계좌 조회
	 * @param id
	 * @return boolean
	 * @throws Exception
	 */
	public Boolean isExistsById(String id) throws Exception {
		//계좌번호가 존재할 때 : "true", 존재하지 않을 때 : "false"
		Optional<Account> oacc = accountRepository.findById(id);
		if(oacc.isPresent()) return true; //계좌번호 이미 존재
		return false; //존재하지않으면 "false"리턴
		
	}

	/**
	 * 입금
	 * @param id : 계좌번호
	 * @param money : 금액
	 * @return Account : 엔티티
	 * @throws Exception
	 */
	@Transactional(readOnly = false) //save() - Inert문
	public Integer deposit(String id, Integer money) throws Exception {
		// 아이디를 기준으로 save한 뒤 save된 출금액 반환
		Optional<Account> oacc = accountRepository.findById(id);
		if(!oacc.isPresent()) throw new Exception("deposit 계좌번호 오류");
		Account acc = oacc.get();
		acc.deposit(money); //account객체에서 입금.
		accountRepository.save(acc); //업데이트 진행됨 반환 전달받은 인자인 acc타입으로 반환 
		return acc.getBalance();
		
	}
	/**
	 * 출금
	 * @param id : 계좌번호
	 * @param money : 금액
	 * @return Account : 엔티티
	 * @throws Exception
	 */
	@Transactional(readOnly = false) //save() - Inert문
	public Integer withdraw(String id, Integer money) throws Exception {
		Optional<Account> oacc = accountRepository.findById(id);
		if(!oacc.isPresent()) throw new Exception("withdraw 계좌번호 오류");
		Account acc = oacc.get(); //id를 통해 가져온 계좌객체
		acc.withdraw(money); // 출금
		return accountRepository.save(acc).getBalance(); //출금후 금액 반환
	}
	
	/**
	 * 계좌이체
	 * @param uid : 송금계좌
	 * @param rid : 수금계좌
	 * @return Object : Map객체
	 * @throws Exception
	 */
	@Transactional(readOnly = false) //save() - Inert문
	public Map<String,Integer> transfor(String sid, String rid, Integer money) throws Exception {
		// 송금계좌에서 money만큼 출금
		
		// 수금계좌에서 money만큼 입금
		Integer sBalance = deposit(rid,money);
		Integer rBalance = withdraw(sid,money);
		Map<String,Integer> result = new HashMap();
		result.put("money", money);
		result.put("sBalance", sBalance);
		result.put("rBalance", rBalance);
		return result;

	}
	
	@Transactional(readOnly = false) //save() - Inert문
	public Integer transfor2(String sid, String rid, Integer money) throws Exception {
		
		// 송금계좌에서 money만큼 출금
		Optional<Account> osacc = accountRepository.findById(sid);
		if(!osacc.isPresent()) throw new Exception("보내는 계좌번호 오류");
		Account sacc = osacc.get();
		sacc.withdraw(money);
		
		Optional<Account> rsacc = accountRepository.findById(sid);
		if(!rsacc.isPresent()) throw new Exception("받는 계좌번호 오류");
		Account racc = rsacc.get();
		racc.deposit(money);
		accountRepository.save(sacc);
		accountRepository.save(racc);
		
		// 수금계좌에서 money만큼 입금
		return sacc.getBalance();
	}
}
