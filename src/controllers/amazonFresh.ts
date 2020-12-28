import fetch from 'node-fetch';

const handleIngredients = async (req: any, res: any, next: any) => {
  const requestBody = req.body;
  // eslint-disable-next-line prefer-const
  let submissionJsonObj: any = {
    ingredients: [],
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const element of requestBody) {
    submissionJsonObj.ingredients.push({
      name: element.item,
      quantityList: [
        {
          unit: element.unit_of_measure,
          amount: element.quantity,
        },
      ],
    });
  }
  try {
    const response = await fetch('https://www.amazon.com/afx/ingredients/landing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(submissionJsonObj),
    });
    const responseBody = await response.json();
    return res.status(200).json(responseBody);
  } catch (err) {
    return next(err);
  }
};

export default {
  handleIngredients,
};

// User's available inventory:

// [
//   {
//     "input_id": "number",
//     "ingredient_id": "number",
//     "item": "string",
//     "quantity": "string/num",
//     "unit_of_measure": "string",
//     "days_until_expiration": "number"
//   }
// ]

// Example post:

// {
//   "ingredients": [
//       {
//           "name": "green apples",
//           "quantityList": [
//               {
//                   "unit": "COUNT",
//                   "amount": 5
//               },
//               {
//                   "unit": "KILOGRAMS",
//                   "amount": 0.5
//               }
//           ]
//       },
//       {
//           "name": "strawberry non-fat greek yogurt",
//           "quantityList": [
//               {
//                   "unit": "OUNCES",
//                   "amount": 5
//               }
//           ]
//       }
//   ]
// }
