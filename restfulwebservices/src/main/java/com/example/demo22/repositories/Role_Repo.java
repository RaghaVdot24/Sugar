package com.example.demo22.repositories;

import com.example.demo22.models.Role;
import com.example.demo22.models.RoleName;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface Role_Repo extends CrudRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}

