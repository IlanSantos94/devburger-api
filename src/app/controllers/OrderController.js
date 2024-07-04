import * as yup from 'yup'
import Order from '../schemas/Order'

class OrderController {
    async store (request, response){
        const  schema = yup.object({
            products: yup.array().required().of(
              yup.object({
                id: yup.number().required(),
                quantity: yup.number().required(),
              })
            ),
        });

        try{
          schema.validateSync(request.body, { abortEarly: false });
        } catch(err){
          return response.status(400).json({error: err.errors});
        }

        const {products} = request.body;
        
        const order = {
            user: {
                id: request.userId,
                name: request.userName,
            },
            products,
        }
  

          return response.status(201).json(order);
    }

}

export default new OrderController()