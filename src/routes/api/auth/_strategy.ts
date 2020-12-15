import passport from "passport";
// import { createHash } from "crypto";
//import bcrypt from "bcrypt";
import { Strategy as Local } from "passport-local";
// import { Strategy as Ldap } from "passport-ldapauth";

import { User } from "models/user";
// import { urlencoded } from "body-parser";
// import { createClient } from "ldapjs";

// 'ldap' => array(
//   'host' => "uottawa.ad.uottawa.ca",
//   'port'=> "389",
//   'people_base_dn' => "OU=Medicine,OU=Faculties,DC=uottawa,DC=ad,DC=uottawa,DC=ca",
//   'groups_base_dn' => "OU=Groups,OU=Medicine,OU=Faculties,DC=uottawa,DC=ad,DC=uottawa,DC=ca",
//   'search_dn' => "CN=Medtech Entrada Service Account,OU=Service Accounts,OU=Users,OU=Medicine,OU=Faculties,DC=uottawa,DC=ad,DC=uottawa,DC=ca",
//   'search_dn_pass' => "jRw3aAHadjJffUmVaDcNBT3wg",
//   'member_attr' => "distinguishedname",
//   'user_query_field' => "samaccountname",
//   'cgroup_base_dn' => "",
//   'user_identifier' => "sAMAccountName",
//   'local_user_query_field' => "username",
//   'useSsl' => false
// ),

const {
  LDAP_HOST = "uottawa.ad.uottawa.ca",
  LDAP_PORT = "389",
  LDAP_IDENTIFIER = "sAMAccountName",
  LDAP_BINDDN = "OU=Groups,OU=Medicine,OU=Faculties,DC=uottawa,DC=ad,DC=uottawa,DC=ca",
  LDAP_SEARCH = "CN=Medtech Entrada Service Account,OU=Service Accounts,OU=Users,OU=Medicine,OU=Faculties,DC=uottawa,DC=ad,DC=uottawa,DC=ca",
  LDAP_SEARCH_FILTER = "",
  LDAP_USERNAME = "username",
  LDAP_PASSWORD,
} = process.env;

// export const client = createClient({
//   url: `ldap://${LDAP_HOST}:${LDAP_PORT}`
// });

passport.use(
  new Local(async (username, password, cb) => {
    try {
      const user = await User.query()
        .alias("u")
        .select(
          "u.username",
          "u.password",
          "u.salt",
          "u.firstname",
          "u.lastname",
          "u.email"
        )
        .where("u.username", username)
        .orWhere("u.email", username)
        .first();

      if (!user) {
        cb(null, false, { message: "User does not exists." });
      }

      // const hash = createHash("sha1")
      //   .update(password + user.salt)
      //   .digest("utf8");

      // console.log({ user });
      // console.log({ password });
      // const salt = user.salt;
      // console.log({ salt });
      // const pass = await bcrypt.hash(password, salt);
      // console.log({ pass });

      // const result = await bcrypt.compare(user.password, password + user.salt);

      // console.log({ user, result });
      // // console.log({ username, password });
      // // console.log(User);
      cb(null, user, { message: "Login succesfully." });
    } catch (err) {
      cb(null, err, { message: "Error" });
      console.log(err);
    }
  })
);

// passport.use(
//   new Ldap(
//     {
//       server: {
//         url: `ldap://${LDAP_HOST}:${LDAP_PORT}`,
//         bindDN: LDAP_BINDDN,
//         bindCredentials: LDAP_PASSWORD,
//         searchBase: LDAP_SEARCH,
//         searchFilter: LDAP_SEARCH_FILTER
//       },
//       usernameField: LDAP_USERNAME
//     },
//     async (username, password, cb) => {
//       // TODO
//       // Docs: https://www.npmjs.com/package/passport-ldapauth
//     }
//   )
// );

passport.serializeUser((user, cb) => {
  // Serialized obj
  cb(null, user);
});
passport.deserializeUser((obj, cb) => {
  // Deserialized obj
  cb(null, obj);
});
