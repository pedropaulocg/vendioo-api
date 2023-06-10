import User from "../../models/User";
import * as Yup from "yup"
import { HTTPError } from "../../middlewares/error_handler";


interface Request {
  email: string;
  password: string;
  name: string
}

interface Response {
  email: string;
  name: string;
  id: number;
}

const CreateUserService = async ({
  email,
  password,
  name
}: Request): Promise<Response> => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required().test(
      "Verifique o email",
      "Um usuario ja possui esse email",
      async value => {
        const emailExists = await User.findOne({
          where: { email: value! }
        });
        return !emailExists;
      }
    ),
    password: Yup.string().required()
  })
  try {
    await schema.validate({email, password, name})
  } catch (err) {
    throw new HTTPError(403,err)
  }
  
  const user = await User.create({
    email,
    password,
    name
  })

  const serializedUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return serializedUser;
} 

export default CreateUserService;

