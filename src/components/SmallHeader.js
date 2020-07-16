import React from "react";
import styled from "@emotion/styled";
import Link from "components/Link";
import Logo from "../../assets/logo.png";
import { bpMaxSM, bpTabletOnly } from "@/lib/breakpoints";
import { fonts } from "@/lib/typography";

const HeaderContainer = styled.header`
  width: 100%;
  height: 6rem;
  margin: 0;

  display: grid;
  align-items: start;
  justify-content: center;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: "left content right";

  padding: 1rem;
  background-image: linear-gradient(
    to left top,
    #0443ac,
    #1048af,
    #194db1,
    #2052b4,
    #2757b6,
    #2a5ab9,
    #2d5dbb,
    #3060be,
    #3161c2,
    #3262c5,
    #3363c9,
    #3464cc
  );
  color: white;
  font-family: ${fonts.regular};
  ${bpTabletOnly} {
    height: 15rem;
  }
  ${bpMaxSM} {
    font-size: 14px;
    grid-template-columns: 1fr;
    grid-template-areas: "hero";
    padding: 0 1rem;
    height: 12rem;
  }
`;

const Nav = styled.nav`
  grid-area: content;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: space-between;
  align-items: start;
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-family: ${fonts.titles};
  font-size: 14px;
  font-weight: bold;
  img {
    width: 70px;
    margin: 0;
  }
`;

const NavLink = styled(HeaderLink)`
  padding: 8px 10px;
  border-radius: 3px;
  background: transparent;
  font-weight: normal;
  font-family: ${fonts.regular};
  font-size: 16px;
  & + &: {
    margin-left: 10px;
  }
`;

const NAVIGATION = [
  /*{ to: "/blog", label: "Blog" },
  { to: "/podcasts", label: "Podcasts" },*/
  { to: "/about", label: "About" },
];

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <HeaderLink to="/">
          <img src={Logo} alt="Sitio de Matias Hernandez" />
        </HeaderLink>
        <div css={{ justifySelf: "end" }}>
          {NAVIGATION.map((item) => (
            <NavLink key={item.label} to={item.to} aria-label={item.label}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
