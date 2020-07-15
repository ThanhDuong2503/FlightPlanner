package de.neuefische.aeropath.security;

import de.neuefische.aeropath.db.UserDb;
import de.neuefische.aeropath.model.FlightUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.List;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JWTUtils jwtUtils;
    private final UserDb userDb;

    @Autowired
    public JwtAuthFilter(JWTUtils jwtUtils, UserDb userDb) {
        this.jwtUtils = jwtUtils;
        this.userDb = userDb;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        Optional<String> jwtToken = getJwtToken(httpServletRequest);

        if (jwtToken.isPresent()) {
            log.debug("start parsing jwt token");
            try {
                String userName = jwtUtils.extractUserName(jwtToken.get());
                log.debug("parsed username " + userName);

                Optional<FlightUser> user = userDb.findById(userName);

                if (user.isPresent() && jwtUtils.validateToken(jwtToken.get(), user.get().getUsername())) {
                    FlightUser planningUser = user.get();
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(planningUser.getUsername(), null,  List.of(new SimpleGrantedAuthority("admin")));

                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            } catch (Exception e) {
                log.info("failed to get credentials", e);
            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }


    private Optional<String> getJwtToken(HttpServletRequest httpServletRequest) {
        String authorizationHeader = httpServletRequest.getHeader("Authorization");

        if (authorizationHeader != null) {
            String token = authorizationHeader.replace("Bearer", "").trim();
            return Optional.of(token);
        }
        return Optional.empty();
    }
}