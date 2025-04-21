import React from "react";

function Logo() {
  return (
    <div className="h-10 w-10">
      <img
        src="https://www.logoai.com/uploads/output/2025/03/03/43ec017c8de8a3a36a05c343a452378c.jpg"
        alt="HeaderLogo"
      />
    </div>
  );
}

function DownLogo() {
  return (
    <div className="h-10 w-10">
      <img
        src="https://res.cloudinary.com/vistaprint/images/c_scale,w_448,h_448,dpr_2/f_auto,q_auto/v1705580325/ideas-and-advice-prod/en-us/target_142183cd7b8/target_142183cd7b8.png?_i=AA"
        alt="FooterLogo"
      />
    </div>
  );
}

export { Logo, DownLogo };
