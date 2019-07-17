import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>404: NOT FOUND</h1>
    <h3>
      Return
      <Link to="/">Home</Link>
    </h3>
  </Layout>
);

export default NotFoundPage;
