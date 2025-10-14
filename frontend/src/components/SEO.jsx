import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, url }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    {image && <meta property="og:image" content={image} />}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <link rel="canonical" href={url} />
  </Helmet>
);

export default SEO;
