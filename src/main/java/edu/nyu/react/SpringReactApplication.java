package edu.nyu.react;

import edu.nyu.react.domain.Coin;
import edu.nyu.react.domain.CoinRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@SpringBootApplication
public class SpringReactApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringReactApplication.class, args);
    }


    @Component
    public class DatabaseLoader implements CommandLineRunner {

        private final CoinRepository coinRepository;

        @Autowired
        public DatabaseLoader(CoinRepository coinRepository) {
            this.coinRepository = coinRepository;
        }

        @Override
        public void run(String... strings) throws Exception {

            this.coinRepository.save(new Coin("Bitcoin", new BigDecimal("62541.74"), new BigDecimal("62538.11")));
            this.coinRepository.save(new Coin("Ethereum", new BigDecimal("4565.74"), new BigDecimal("4565.37")));
        }
    }
}
