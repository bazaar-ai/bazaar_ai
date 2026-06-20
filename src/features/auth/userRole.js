export const UserRole = {
  MERCHANT: "MERCHANT",
  INVESTOR: "INVESTOR",
};

export const ROLE_META = {
  [UserRole.MERCHANT]: {
    label: "Tacir",
    description:
      "İnvoyslarını yüklə, risk balını bir dəqiqəyə al, faktorinqlə pulunu bu gün nağdlaşdır.",
  },
  [UserRole.INVESTOR]: {
    label: "İnvestor",
    description:
      "Yoxlanılmış invoys sövdələrinə investisiya et, illik 12–18% gəlir qazan.",
  },
};
