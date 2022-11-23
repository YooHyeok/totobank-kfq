package com.example.bank.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor /*매개변수 없는 기본 생성자*/ 
@AllArgsConstructor /*모든 필드를 매개변수로 받는 생성자*/
@ToString
@Entity
public class Account {
	
	@Id
	private String id;
	@Column
	private String name;
	@Column
	private String password;
	@Column
	private String grade;
	@Column
	private Integer balance;
	
	public void deposit(Integer money) {
		System.out.println("입금 전 금액"+balance+"입금액"+money+"입금후금액"+(balance+money));
		this.balance += money;
	}
	public void withdraw(Integer money)throws Exception {
		System.out.println("출금 전 금액"+balance+"출금액"+money+"출금후금액"+(balance-money));
		if(this.balance < money)throw new Exception("잔액 부족");
		this.balance -= money;
	}
}
