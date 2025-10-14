package com.website.ecommerce.service;

import com.website.ecommerce.configuration.EcommercePropertyConfiguration;
import com.website.ecommerce.model.Role;
import com.website.ecommerce.model.User;
import com.website.ecommerce.repository.RoleRepository;
import com.website.ecommerce.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EcommercePropertyConfiguration ecommercePropertyConfiguration;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final JSONObject dataObject = new JSONObject();

    @Transactional
    public void createDefaultUser() {
        log.info("Create User flag: {}", ecommercePropertyConfiguration.getCreateDefaultUser());
        List<User> userList = userRepository.findAll();
        List<Role> roleList = roleRepository.findAll();
        log.info("User List is empty: {}", userList.isEmpty());
        log.info("Role List is empty: {}", roleList.isEmpty());
        if (("true".equalsIgnoreCase(ecommercePropertyConfiguration.getCreateDefaultUser())) && (userList.isEmpty() || roleList.isEmpty() )) {
            Role role1 = new Role();
            role1.setRoleId("admin");
            role1.setRoleName("Admin");
            role1.setRoleDescription("Administrator");
            role1.setAction("A");
            roleRepository.save(role1);

            User user1 = new User();
            user1.setUserName("defaultAdmin@123");
            user1.setAction("A");
            user1.setUserFirstName("Ani");
            user1.setUserLastName("K");
            user1.setUserPassword(getEncodedPassword("admin"));
            Set<Role> userRoleSet1 = new HashSet<>();
            userRoleSet1.add(role1);
            user1.setRoles(userRoleSet1);
            userRepository.save(user1);

            Role role2 = new Role();
            role2.setRoleId("user");
            role2.setRoleName("User");
            role2.setRoleDescription("User");
            role2.setAction("A");
            roleRepository.save(role2);

            User user2 = new User();
            user2.setUserName("defaultUser@123");
            user2.setAction("A");
            user2.setUserFirstName("Ani");
            user2.setUserLastName("K");
            user2.setUserPassword(getEncodedPassword("user"));
            Set<Role> userRoleSet2 = new HashSet<>();
            userRoleSet2.add(role2);
            user2.setRoles(userRoleSet2);
            userRepository.save(user2);

            log.info("Saved Default User and Role");
        }
    }

    @Transactional
    @SuppressWarnings("unchecked")
    public JSONObject createNewUser(User user) {
        try {
            user.setUserPassword(getEncodedPassword(user.getUserPassword()));
            user.setRoles(roleRepository.findByRoleIdAndAction("user","A"));
            userRepository.save(user);
            dataObject.put("data", user);
        } catch (Exception e) {
            log.error("Error occurred in createNewUser: {}", e);
        }
        return dataObject;
    }

    @Transactional
    @SuppressWarnings("unchecked")
    public JSONObject createNewAdmin(User user) {
        try {
            user.setUserPassword(getEncodedPassword(user.getUserPassword()));
            user.setRoles(roleRepository.findByRoleIdAndAction("admin","A"));
            userRepository.save(user);
            dataObject.put("data", user);
        } catch (Exception e) {
            log.error("Error occurred in createNewAdmin: {}", e);
        }
        return dataObject;
    }

    public String getEncodedPassword (String password) {
        return passwordEncoder.encode(password);
    }
}
