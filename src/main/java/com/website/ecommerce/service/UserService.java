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

    private final JSONObject dataObject = new JSONObject();
    private final HashMap<String, Object> dataMap = new HashMap<>();

    @Transactional
    public void createDefaultUser() {
        log.info("Create User flag: {}", ecommercePropertyConfiguration.getCreateDefaultUser());
        List<User> userList = userRepository.findAll();
        List<Role> roleList = roleRepository.findAll();
        log.info("User List is empty: {}", userList.isEmpty());
        log.info("Role List is empty: {}", roleList.isEmpty());
        if (("true".equalsIgnoreCase(ecommercePropertyConfiguration.getCreateDefaultUser())) && (userList.isEmpty() || roleList.isEmpty() )) {
            Role role = new Role();
            role.setRoleId("admin");
            role.setRoleName("Admin");
            role.setRoleDescription("Administrator");
            role.setAction("A");
            roleRepository.save(role);

            User user = new User();
            user.setUserName("defaultAdmin@123");
            user.setAction("A");
            user.setUserFirstName("Ani");
            user.setUserLastName("K");
            user.setUserPassword("admin");
            Set<Role> userRoleSet = new HashSet<>();
            userRoleSet.add(role);
            user.setRoles(userRoleSet);
            userRepository.save(user);

            log.info("Saved Default User and Role");
        }
    }

    @Transactional
    @SuppressWarnings("unchecked")
    public JSONObject createNewUser(User user) {
        try {
            userRepository.save(user);
            dataMap.put("User", user);
            dataObject.put("data", dataMap);
        } catch (Exception e) {
            log.error("Error occurred in createNewUser: {}", e);
        }
        return dataObject;
    }
}
