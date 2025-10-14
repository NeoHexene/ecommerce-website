package com.website.ecommerce.service;

import com.website.ecommerce.model.Role;
import com.website.ecommerce.repository.RoleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    private final JSONObject dataObject = new JSONObject();

    @Transactional
    @SuppressWarnings("unchecked")
    public JSONObject createNewRole(Role role) {
        try {
            roleRepository.save(role);
            dataObject.put("data",role);
        } catch (Exception e) {
            log.error("Error occurred in createNewRole:{}",e);
        }
        return dataObject;
    }
}
