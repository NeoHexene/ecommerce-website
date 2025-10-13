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
    private final HashMap<String, Object> dataMap = new HashMap<>();

    @Transactional
    @SuppressWarnings("unchecked")
    public JSONObject createNewRole(Role role) {
        try {
            roleRepository.save(role);
            dataMap.put("Role", role);
            dataObject.put("data",dataMap);
        } catch (Exception e) {
            log.error("Error occurred in createNewRole:{}",e);
        }
        return dataObject;
    }
}
