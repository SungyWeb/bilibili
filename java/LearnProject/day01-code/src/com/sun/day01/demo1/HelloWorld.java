package com.sun.day01.demo1;

public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
    int res = sum(1, 2);
    System.out.println(res);
  }
  public static int sum(int a, int b) {
    return a + b;
  }
}
