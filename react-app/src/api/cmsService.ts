import api from "./client";

export const getBanners = () => api.get("/cms/banners");
export const getHomepageSections = () => api.get("/cms/sections");
