declare module './projects.api' {
  export const projectsAPI: {
    getAllProjects: () => Promise<any[]>;
    createProject: (projectData: any) => Promise<any>;
    updateProject: (id: number, projectData: any) => Promise<any>;
    deleteProject: (id: number) => Promise<any>;
  };
}
