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
  ${bpMaxSM} {
    grid-template-columns: 100%;
    grid-template-areas: "copy";
  }
`;
const TitleContainer = styled.div`
  grid-area: copy;
`;
const Title = styled.h1`
  font-size: 23px;
  color: white;
  position: relative;
  line-height: 1.5;
  margin: 0;
  font-weight: normal;
  font-family: ${fonts.semibold};
  align-self: start;
  ${bpTabletOnly} {
    font-size: 18px;
    align-self: start;
  }
  ${bpMaxSM} {
    font-size: 16px;
    align-self: start;
  }
`;
const SubTitle = styled.h2`
  font-size: 23px;
  color: white;
  position: relative;
  line-height: 1.5;
  margin: 0;
  font-weight: normal;
  font-family: ${fonts.semibold};
  align-self: start;
  ${bpTabletOnly} {
    font-size: 18px;
    align-self: start;
  }
  ${bpMaxSM} {
    font-size: 16px;
    align-self: start;
  }
`;

const Image = styled.img`
  grid-area: image;
  max-width: 17rem;
  justify-self: end;
  align-self: end;
  margin-bottom: 0;
  ${bpTabletOnly} {
    max-width: 200%;
    margin-bottom: 1.2rem;
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

const Container = styled.div`
  grid-area: hero;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-row-gap: 3rem;
  ${bpTabletOnly} {
    grid-row-gap: 2rem;
  }
  ${bpMaxSM} {
    grid-row-gap: 1rem;
  }
`;

const Nav = styled.nav`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: start;
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
  & + &: {
    margin-left: 10px;
  }
`;

const NAVIGATION = [
  { to: "/blog", label: "Blog" },
  // { to: "/podcasts", label: "Podcasts" },
  { to: "/about", label: "About" },
];

const Header = () => {
  return (
    <HeaderContainer>
      <Container>
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
              <NavLink key={item.label} to={item.to} aria-label={item.label}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </Nav>
        <HeroContainer>
          <TitleContainer>
            <Title>Hola! Soy Matias Hernández A.</Title>
            <SubTitle>
              Bienvenido a mi digital garden, en donde comparto contenido para
              ayudar a otros desarrolladores a escribir mejores productos
            </SubTitle>
          </TitleContainer>
          <Image src={Photo} alt="Matias Hernandez" />
        </HeroContainer>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
