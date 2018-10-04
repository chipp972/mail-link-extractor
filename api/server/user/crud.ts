import {UserManager} from '../../services/user/user_typedef';

export const getUserRoute = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userManager.read(userId);
    if (!user) {
      return next(new Error(`No user found with id ${userId}`))
    
    }
    res.result = user;
    return next();
  } catch (err) {
    return next(err);
  }
}

interface Props {
  userManager: UserManager
}

export const userCrud = ({ userManager }: Props) => {
  const routes = [
    {method: 'GET', url: '/api/users/:id', route: getUserRoute(userManager)},
  ]

}
