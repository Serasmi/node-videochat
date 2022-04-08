interface IWithId {
  id: string;
}

interface IWithMongoId {
  _id: string;
}

export const convertFromMongoObject = ({
  _id,
  ...rest
}: IWithMongoId): IWithId => ({ id: _id, ...rest });
