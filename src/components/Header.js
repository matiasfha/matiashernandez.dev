import React from "react";
import styled from "@emotion/styled";
import Link from "components/Link";
import Logo from "../../assets/logo.png";
import Photo from "../../assets/photo.png";
import { bpMaxSM, bpTabletOnly } from "@/lib/breakpoints";
import { fonts } from "@/lib/typography";

const HeroContainer = styled.section`
  margin: 0 auto;
  padding: 0;
  * {
    color: white;
  }
  width: 100%;
  z-index: 0;
  position: relative;

  display: grid;
  justify-content: space-between;
  align-items: start;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-areas: "copy empty image";
  padding-top: 0rem;
  grid-template-rows: 156px;
`;

const Copy = styled.h1`
  grid-area: copy;
  font-size: 25px;
  color: white;
  position: relative;
  line-height: 1.5;
  margin: 0;
  font-weight: normal;
  font-family: ${fonts.semibold};
`;

const Image = styled.img`
  grid-area: image;
  max-width: 130%;
  justify-self: end;
  align-self: end;
  ${bpTabletOnly} {
    max-width: 150%;
  }
  ${bpMaxSM} {
    display: none;
  }
`;

const HeaderContainer = styled.header`
  width: 100%;
  height: 17.7rem;
  margin: 0;

  display: grid;
  align-items: end;
  justify-content: center;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: "left hero right";

  padding: 0;
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
`;

const Container = styled.div`
  grid-area: hero;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-row-gap: 5rem;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
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
  { to: "/blog", label: "Blog" },
  { to: "/podcasts", label: "Podcasts" },
  { to: "/about", label: "About" },
];

const Header = ({ title }) => {
  return (
    <HeaderContainer>
      <Container>
        <Nav>
          <HeaderLink to="/">
            <img src={Logo} alt={title} />
          </HeaderLink>
          <div css={{ justifySelf: "end" }}>
            {NAVIGATION.map((item) => (
              <NavLink key={item.label} to={item.to} aria-label={item.label}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </Nav>
        <HeroContainer>
          <Copy>
            Hola! Soy Matias. Te ayudo a crear mejor software o a transformar tu
            idea en realidad.
          </Copy>
          <Image src={Photo} alt="Matias Hernandez" />
        </HeroContainer>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
