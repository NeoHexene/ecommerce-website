package com.website.ecommerce.repository;

import com.website.ecommerce.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    public Set<Role> findByRoleIdAndAction(String roleId, String action);

    public List<Role> findByAction (String action);
}