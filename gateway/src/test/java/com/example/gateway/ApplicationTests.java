package com.example.gateway;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ApplicationTests {

	@Test
	void contextLoads() {
		long l = 1L;
		Assert.assertEquals(1L, l);
	}

}
