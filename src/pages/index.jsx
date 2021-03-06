import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import AnimalCard from "../components/AnimalCard";
import Seo from "../components/Seo";
// import Animate from '../components/Animate';
import Animate from "../components/Animate";
import Container from "../components/Container";
import Header from "../components/Header";

function Page({ data }) {
  const page = data.pageYaml;
  const animals = data.allMarkdownRemark.nodes.map((node) => node.frontmatter);

  return (
    <Layout>
      <Seo meta={page.meta} />
      <Header header={page.header} />
      <section>
        <Container layout="sm">
          <div className="pt-8 pb-20 sm:pt-4 lg:pt-6">
            <div className="">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:gap-6">
                {animals.map((animal, index) => (
                  <Animate key={animal.slug} delay={index % 3}>
                    <AnimalCard
                      animal={animal}
                      image={animal.image.childImageSharp.gatsbyImageData}
                    />
                  </Animate>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

Page.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default Page;

export const query = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { collection: { eq: "animal" } } }) {
      nodes {
        frontmatter {
          slug
          excerpt
          category
          title
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
    pageYaml(slug: { eq: "home" }) {
      ...meta
      ...header
    }
  }
`;
