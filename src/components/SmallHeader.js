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
  background-image: ${(props) =>
    props.background
      ? `linear-gradient(
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
  );`
      : "none"}
  color: white;
  font-family: ${fonts.regular};
  ${bpTabletOnly} {
    height: 15rem;
  }
  ${bpMaxSM} {
    font-size: 14px;
    grid-template-columns: 1fr;
    grid-template-areas: "hero";
    padding: 0.5rem 1rem;
    height: 5rem;
  }
`;

const Nav = styled.nav`
  grid-area: content;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: start;
  ${bpMaxSM} {
    grid-area: hero;
  }
`;

const HeaderLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-family: ${fonts.titles};
  font-size: 14px;
  font-weight: bold;
  img {
    width: 60px;
    margin: 0;
  }
`;

const NavLink = styled(HeaderLink)`
  padding: 0px 10px;
  border-radius: 3px;
  background: transparent;
  font-weight: normal;
  font-family: ${fonts.regular};
  font-size: 16px;
  color: ${(props) => (props.background ? "white" : "#333")};
  & + &: {
    margin-left: 10px;
  }
`;

const NAVIGATION = [
  { to: "/blog", label: "Blog" },
  // { to: "/podcasts", label: "Podcasts" },
  { to: "/about", label: "About" },
];

const Header = ({ background = true }) => {
  return (
    <HeaderContainer background={background}>
      <Nav>
        <HeaderLink to="/">
          <img src={Logo} alt="Sitio de Matias Hernandez" />
        </HeaderLink>
        <div
          css={{
            justifySelf: "end",
            alignSelf: "start",
            padding: "0.5rem 0",
          }}
        >
          {NAVIGATION.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              aria-label={item.label}
              background={background}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
