const jwt = require("jsonwebtoken");
const {
  getAuthUser,
} = require("../../models/architectures/architecture.model");
const {
  getOneTeam,
  getOneDirectorate,
  getOneDeputy,
} = require("../../models/architectures/architecture.model");
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await getAuthUser(email, password);
    const data = {
      type: "",
      name: "",
      id: user._id,
      userName:user.name,
      role: user.role,
      teamId: user.teamId,
      directorateId: user.directorateId,
      deputyId: user.deputyId,
    };
    switch (user.role) {
      case "commissioner":
        data.type = "commissioner";
        data.name = "commissioner";
        break;
      case "deputy commissioner":
        const deputy = await getOneDeputy(user.deputyId);
        data.type = "deputy";
        data.name = deputy.name;
        break;
      case "director":
        const directorate = await getOneDirectorate(user.directorateId);
        data.type = "directorate";
        data.name = directorate.name;
        break;
      case "team leader":
        const team = await getOneTeam(user.teamId);
        data.type = "team";
        data.name = team.name;
        break;
      default:
        data.type = "employee";
        data.name = "";
    }
    const token = jwt.sign(
      {
        userInfo: {
          id: user._id,
          role: user.role,
        },
      },
      "AMHARA SCIENCE AND TECHNOLOGY COMMSSION",
      {
        expiresIn: 60 * 60 * 6,
      }
    );
    // res.cookie("jwt", token, {
    //   maxAge: 1000 * 60 * 60 * 6,
    //   httpOnly: true,
    // });
 return res.status(200).json(data);
  } catch (err) {
    return res.status(403).json({ error:`${err}` });
  }
}

async function logout(req, res) {
  try {
    const data = {};
    res.cookie(jwt, "", { maxAge: 1 });
   
    return res.status(200).json(data);
  } catch (err) {
    return res.status(403).json({ err });
  }
}

module.exports = {
  login,
  logout,
};
