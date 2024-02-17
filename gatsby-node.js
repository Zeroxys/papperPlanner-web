exports.createPages = async ({ actions }) => {
  const { createPage, createRedirect } = actions;

  createPage({
    path: "/calendar/:id",
    component: require.resolve("./src/pages/calendar.tsx"),
  });

  createRedirect({
    fromPath: "/calendar",
    toPath: "/calendar/",
    redirectInBrowser: true,
    isPermanent: true,
  });
};
