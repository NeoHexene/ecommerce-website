package com.website.ecommerce.service;

import com.website.ecommerce.dto.JwtRequestDto;
import com.website.ecommerce.dto.JwtResponseDto;
import com.website.ecommerce.model.User;
import com.website.ecommerce.repository.UserRepository;
import com.website.ecommerce.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
public class JwtService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final HashMap<String, Object> dataMap = new HashMap<>();
    private final JSONObject dataObject = new JSONObject();

    @SuppressWarnings("unchecked")
    public JSONObject createJwtToken(JwtRequestDto jwtRequestDto,
                                     AuthenticationManager authenticationManager) throws Exception {
        String userName = jwtRequestDto.getUserName();
        String userPassword = jwtRequestDto.getUserPassword();
        authenticate(userName,userPassword,authenticationManager);
        final UserDetails userDetails = loadUserByUsername(userName);
        final String generatedToken = jwtUtil.generateJwtToken(userDetails);
        Optional<User> userOptional = userRepository.findByUserName(userName);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            JwtResponseDto jwtResponseDto = new JwtResponseDto(user, generatedToken);
            dataMap.put("JwtResponse", jwtResponseDto);
            dataObject.put("data", dataMap);
            return  dataObject;
        } else {
            throw new Exception("User not found in database.");
        }
    }

    private void authenticate(String userName, String userPassword,
                              AuthenticationManager authenticationManager) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName,userPassword));
        } catch (DisabledException e) {
            throw new Exception("User is Disabled");
        } catch (BadCredentialsException e) {
            throw new Exception("Invalid Credentials");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.findByUserName(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new org.springframework.security.core.userdetails.User(
                    user.getUserName(), user.getUserPassword(), getAuthorities(user)
            );
        } else {
            throw new UsernameNotFoundException("Username not found in database.");
        }
    }

    private Set<SimpleGrantedAuthority> getAuthorities (User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach( role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_"+role.getRoleId()));
        });
        return authorities;
    }
}
