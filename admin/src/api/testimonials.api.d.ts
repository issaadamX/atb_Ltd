declare module './testimonials.api' {
  export const testimonialsAPI: {
    getAllTestimonials: () => Promise<any[]>;
    createTestimonial: (testimonialData: any) => Promise<any>;
    updateTestimonial: (id: number, testimonialData: any) => Promise<any>;
    deleteTestimonial: (id: number) => Promise<any>;
  };
}
