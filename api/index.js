import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import {
    DynamoDBClient,
    PutItemCommand,
    QueryCommand,
    ScanCommand,
    UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import crypto from 'crypto';
import {
    CognitoIdentityProviderClient,
    ConfirmSignUpCommand,
    InitiateAuthCommand,
    ResendConfirmationCodeCommand,
    SignUpCommand,

} from '@aws-sdk/client-cognito-identity-provider';
import { docClient, PutCommand } from './db.js';
import {
    BatchGetCommand,
    GetCommand,
    UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import http from 'http'
import { Server } from 'socket.io'

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const PORT = 9000;

const dynamoDbClient = new DynamoDBClient({ region: 'us-east-1' });
const cognitoClient = new CognitoIdentityProviderClient({ region: 'us-east-1' });

const server = http.createServer(app)

app.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        const hashedPassword = await bcrypt.hash(userData?.password, 10);
        const userId = crypto.randomUUID();

        const newUser = {
            userId: userId,
            email: userData.Email,
            password: hashedPassword,
            firstName: userData.firstName,
            lastName: userData.lastName || '',
            gender: userData.gender,
            dateOfBirth: userData.dateOfBirth || '',
            type: userData.type,
            location: userData.location || '',
            hometown: userData.hometown,
            workPlace: userData.workPlace || '',
            jobTitle: userData.jobTitle || '',
            datingPreference: userData.datingPreference,
            lookingFor: userData.LookingFor,
            imageUrls: userData.imageUrls || [],
            prompts: userData.prompts,
            likes: 2,
            roses: 1,
            likedProfiles: [],
            receivedLikes: [],
            matches: [],
            blockedUsers: [],
        }

        const params = {
            TableName: 'users',
            Item: newUser
        }

        await docClient.send(new PutCommand(params));

        const secretKey =
            '582e6b12ec6da3125121e9be07d00f63495ace020ec9079c30abeebd329986c5c35548b068ddb4b187391a5490c880137c1528c76ce2feacc5ad781a742e2de0'; // Use a better key management
        const token = jwt.sign({ userId: newUser.userId }, secretKey);
        res.status(200).json({ token });
    }
    catch (error) {
        console.log("Error creating the user", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/sendOtp', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    const signUpParams = {
        ClientId: '6eagcfa23b96blfm5u7j807km2',
        Username: email,
        Password: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: email
            }
        ]
    }

    try {
        const command = new SignUpCommand(signUpParams);
        await cognitoClient.send(command);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.log("Sign up Params:", signUpParams);
        console.error("Error sending OTP:", error);
        res.status(400).json({ error: error.message || 'Failed to send OTP. Please try again', details: error.message });
    }
})

app.post('/resendOtp', async (req, res) => {
    const { email } = req.body;

    const resendOtpParams = {
        ClientId: '6eagcfa23b96blfm5u7j807km2',
        Username: email
    }

    try {
        const command = new ResendConfirmationCodeCommand(resendOtpParams);
        await cognitoClient.send(command)
        res.status(200).json({ message: "OTP resent successfully" })
    } catch (error) {
        res.status(400).json({ error: 'Failed to resend OTP. Please try again' });
    }
})

app.post('/confirmSignUp', async (req, res) => {
    const { email, enteredotp } = req.body;

    // const cognitoUsername = await fetchCognitoUsernameByEmail(email); // Implement this function

    // if (!cognitoUsername) {
    //     return res.status(400).json({ error: 'User not found or username missing.' });
    // }

    const confirmParams = {
        ClientId: '6eagcfa23b96blfm5u7j807km2',
        Username: email,
        ConfirmationCode: enteredotp
    }

    try {
        console.log("Confirm Params:", confirmParams);
        const command = new ConfirmSignUpCommand(confirmParams);
        await cognitoClient.send(command);
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to confirm OTP. Please try again' });
    }
})

app.get('/matches', async (req, res) => {
    const { userId } = req.query;

    try {
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const params = {
            TableName: 'users',
            Key: {
                userId
            }
        }

        const { userResult } = await dynamoDbClient.send(new GetCommand(params));

        if (!userResult.Item) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = {
            userId: userResult.Item.userId,
            gender: userResult.Item.gender,
            datingPreference: userResult.Item.datingPreference?.map(pref => pref) || [],
            matches: userResult.Item.matches?.map(match => match) || [],
            likedProfiles: userResult.Item.likedProfiles?.map(liked => likedUserId) || [],
        }

        const genderFilters = user?.datingPreference?.map(g => { { S: g } });

        const excludeIds = [
            ...user?.matches,
            ...user.likedProfiles,
            user.userId
        ].map(id => ({ S: id }));

        const scanParams = {
            TableName: 'users',
            FilterExpression: 'userId <> :currentUserId AND (contains(:genderPref, gender)) AND NOT contains(:excludedIds, userId)',
            ExpressionAttributeValues: {
                ':currentUserId': { S: user.userId },
                ':genderPref': { L: genderFilter.length > 0 ? genderFilter : [{ S: 'None' }] },
                ':excludedIds': { L: excludeIds }
            },
        }

        const scanResult = await dynamoDbClient.send(new ScanCommand(scanParams));

        const matches = scanResult.Items.map(item => ({
            userId: item.userId.S,
            email: item.email.S,
            firstName: item.firstName.S,
            gender: item.gender.S,
            location: item.location.S,
            lookingFor: item.lookingFor.S,
            dateOfBirth: item.dateOfBirth.S,
            hometown: item.hometown.S,
            type: item.type.S,
            jobTitle: item.jobTitle.S,
            workPlace: item.workPlace.S,
            imageUrls: item.imageUrls.L.map(image => image.S) || [],
            prompts: item.prompts.L.map(prompt => ({
                question: prompt.M.question.S,
                answer: prompt.M.answer.S
            })) || [],
        }));

        res.status(200).json({ matches });

    } catch (error) {
        console.log("Error fetching matches", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/user-info', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const params = {
            TableName: 'users',
            Key: {
                userId
            }
        }

        const command = new GetCommand(params);
        const result = await dynamoDbClient.send(command);

        if (!result.Item) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User found', user: result.Item });

    } catch (error) {
        console.log("Error fetching user info", error);
        res.status(500).json({ error: 'Internal server error' });
    }

})

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Recieved Token:", token);

    const secretKey =
        '582e6b12ec6da3125121e9be07d00f63495ace020ec9079c30abeebd329986c5c35548b068ddb4b187391a5490c880137c1528c76ce2feacc5ad781a742e2de0';
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or Expired Token' });
        }

        req.user = user;
        next();
    })
}

app.post('/like-profile', authenticateToken, async (req, res) => {
    const { userId, likedUserId, image, comment = null, type, prompt } = req.body;

    if (req.user.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    if (!likedUserId || !userId || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const userParams = {
            TableName: 'users',
            Key: {
                userId
            }
        }

        const userData = await dynamoDbClient.send(new GetCommand(userParams));

        if (!userData.Item) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = userData.Item;
        const likesRemaining = user.likes.N;
        console.log("Likes Remaining:", likesRemaining);
        const likesLastUpdated = new Date(user?.likesLastUpdated?.S || '0');
        console.log("Likes Last Updated:", likesLastUpdated);
        const now = new Date();
        const maxlikes = 2;
        const oneDay = 24 * 60 * 60 * 1000;

        const timeSinceLastLike = now - likesLastUpdated;
        console.log("Time Since Last Like:", timeSinceLastLike);

        if (timeSinceLastLike >= oneDay) {
            const resetParams = {
                Tablename: 'users',
                Key: {
                    userId
                },
                UpdateExpression: 'SET likes = :maxLikes, likesLastUpdated = :now',
                ExpressionAttributeValues: {
                    ':maxLikes': { N: maxLikes.toString() },
                    ':now': { S: now.toISOString() }
                }
            }
            await dynamoDbClient.send(new UpdateCommand(resetParams));
            user.likes = { N: maxLikes.toString() };
        } else if (likesRemaining <= 0) {
            return res.status(403).json({ message: 'Daily like limit reached, please subscribe or try again tomorrow' });
        }
        const newLikes = likesRemaining - 1;

        const decrementLikesParams = {
            TableName: 'users',
            Key: {
                userId
            },
            UpdateExpression: 'SET likes = :newLikes',
            ExpressionAttributeValues: {
                ':newLikes': { N: newLikes.toString() }
            }
        }

        await DynamoDBClient.send(new UpdateCommand(decrementLikesParams));

        let newLike = { userId, type };

        if (type === 'image') {
            if (!image) {
                return res.status(400).json({ error: 'Image URL is required' });
            }
            newLike.image = image;
        }
        else if (type === 'prompt') {
            if (!prompt || !prompt.question || !prompt.answer) {
                return res.status(400).json({ error: 'Prompt is required' });
            }
            newLike.prompt = prompt;
        }

        if (comment)
            newLike.comment = comment;

        const updatedReceivedLikesParams = {
            TableName: 'users',
            Key: {
                userId: likedUserId
            },
            UpdateExpression: 'SET receivedLikes = list_append(if_not_exists(receivedLikes, :empty_list), :newLike)',
            ExpressionAttributeValues: {
                ':newLike': { L: [newLike] },
                ':empty_list': { L: [] }
            }
        }

        await dynamoDbClient.send(new UpdateCommand(updatedReceivedLikesParams));

        const updatedLikedParams = {
            TableName: 'users',
            Key: {
                userId
            },
            UpdateExpression: 'SET likedProfiles = list_append(if_not_exists(likedProfiles, :empty_list), :likedUserId)',
            ExpressionAttributeValues: {
                ':likedUserId': { L: [likedUserId] },
                ':empty_list': { L: [] }
            },
            ReturnValues: 'UPDATED_NEW'
        }

        await dynamoDbClient.send(new UpdateCommand(updatedLikedParams));

        res.status(200).json({ message: 'Profile liked successfully' });
    } catch (error) {
        console.log("Error liking profile", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/recieved-likes/:userId', authenticateToken, async (req, res) => {
    const { userId } = req.params;

    if (req.user.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    try {
        const userParams = {
            TableName: 'users',
            Key: {
                userId: userId
            },
            ProjectionExpression: 'receivedLikes'
        }

        const userData = await dynamoDbClient.send(new GetCommand(userParams));

        if (!userData.Item) {
            return res.status(404).json({ error: 'User not found' });
        }

        const receivedLikes = userData?.Item?.receivedLikes || [];
        const enrichedLikes = await Promise.all(receivedLikes.map(async like => {
            const userParams = {
                TableName: 'users',
                Key: {
                    userId: like.userId
                },
                ProjectionExpression: 'userId, firstName, imageUrls, prompts',
            }

            const userData = await dynamoDbClient.send(new GetCommand(userParams));
            console.log("User Data:", userData);

            const user = userData?.Item ? {
                userId: userData.Item.userId.S,
                firstName: userData.Item.firstName.S,
                imageUrls: userData.Item.imageUrls.L.map(image => image.S) || [],
                prompts: userData.Item.prompts.L.map(prompt => ({
                    question: prompt.M.question.S,
                    answer: prompt.M.answer.S
                })) || []
            } : { userId: like.userId, firstName: null, imageUrls: null };

            return { ...like, userId: user.userId };
        }))
        res.status(200).json({ receivedLikes: enrichedLikes });
    } catch (error) {
        console.log("Error fetching received likes", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const authParams = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: '6eagcfa23b96blfm5u7j807km2',
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password
        }
    }

    try {
        const authCommand = new InitiateAuthCommand(authParams);
        const authResult = await cognitoClient.send(authCommand);

        const { IdToken, AccessToken, RefreshToken } = authResult.AuthenticationResult;

        const userParams = {
            TableName: 'users',
            IndexName: 'email-index',
            KeyConditionExpression: 'email = :emailValue',
            ExpressionAttributeValues: {
                ':emailValue': { S: email }
            }
        }

        const userResult = await dynamoDbClient.send(new QueryCommand(userParams));

        if (!userResult.Items || userResult.Items.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = userResult.Items[0];
        const userId = user?.userId.S;

        const secretKey =
            '582e6b12ec6da3125121e9be07d00f63495ace020ec9079c30abeebd329986c5c35548b068ddb4b187391a5490c880137c1528c76ce2feacc5ad781a742e2de0';

        const token = jwt.sign({ userId: userId, email: email }, secretKey);

        res.status(200).json({ token, IdToken, AccessToken, RefreshToken });
    } catch (error) {
        console.log("Error logging in", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

async function getIndexToRemove(selectedUserId, currentUserId) {
    const result = await docClient.send(
        new GetCommand({
            TableName: 'users',
            Key: { userId: selectedUserId },
        })
    )

    const likedProfiles = result?.Item?.receivedLikes || [];
    return likedProfiles?.findIndex(like => like.likedUserId === currentUserId);

}

app.post('/create-match', authenticateToken, async (req, res) => {
    try {
        const { currentUserId, selectedUserId } = req.body;
        const userResponse = await docClient.send(new GetCommand({
            TableName: 'users',
            Key: { userId: currentUserId },
        }));

        const receivedLikes = userResponse?.Item?.receivedLikes || [];

        const IndexToRemove = receivedLikes.findIndex(like => like.userId === selectedUserId);

        if (IndexToRemove == -1) {
            return res.status(400).json({ message: "Selected user not found in receivedLikes" })
        }

        const index = await getIndexToRemove(currentUserId, selectedUserId)

        if (index == -1) {
            return res.status(400).json({ message: 'Current user not in liekdProfiles' })
        }

        await docClient.send(
            new UpdateCommand({
                TableName: 'users',
                Key: { userId: selectedtUserId },
                UpdateExpression: `SET #matches = list_append(if_not_exists(#matches, :empty_list), :currentUser) REMOVE #likedProfiles[${index}]`,
                ExpressionAttributeNames: {
                    '#matches': 'matches',
                    '#likedProfiles': 'likedProfiles',
                },
                ExpressionAttributeValues: {
                    ':currentUser': { L: [{ S: currentUserId }] },
                    ':empty_list': { L: [] }
                },

            }))

        await docClient.send(
            new UpdateCommand({
                TableName: 'users',
                Key: { userId: currentUserId },
                UpdateExpression: `SET #matches = list_append(if_not_exists(#matches, :empty_list), :selectedUser)`,
                ExpressionAttributeNames: {
                    '#matches': 'matches',
                },
                ExpressionAttributeValues: {
                    ':selectedUser': { L: [{ S: selectedUserId }] },
                    ':empty_list': { L: [] }
                },

            }))

        await docClient.send(
            new UpdateCommand({
                TableName: 'users',
                Key: { userId: currentUserId },
                UpdateExpression: `REMOVE #receivedLikes[${IndexToRemove}]`,
                ExpressionAttributeNames: {
                    '#receivedLikes': 'receivedLikes',
                },
            })
        )

        res.status(200).json({ message: 'Match created successfully' });

    } catch (error) {
        console.log("Error creating match", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/get-matches/:userId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;

        const userResult = await docClient.send(new GetCommand({
            TableName: 'users',
            Key: { userId },
            ProjectionExpression: 'matches'
        }));

        const matches = userResult?.Item?.matches || [];

        if (!matches.length) {
            return res.status(404).json({ message: 'No matches found' });
        }

        const batchGetParams = {
            RequestItems: {
                users: {
                    Keys: matches.map(matchId => ({ userId: matchId })),
                    ProjectionExpression: 'userId, firstName, imageUrls, prompts'
                }
            }
        }

        const matchResult = await docClient.send(new BatchGetCommand(batchGetParams));

        const matchedUsers = matchResult?.Responses?.users || [];

        res.status(200).json({ matches: matchedUsers })
    } catch (error) {
        console.log("Error fetching matches", error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.listen(2500, () => {
    console.log('Server is running on port 2500')
})

const io = new Server(server)

const userSocketMap = {}

io.on('connection', socket => {
    const userId = socket.handshake.query.userId;

    if (userId !== undefined) {
        userSocketMap[userId] = socket.id
    }

    console.log('User socket data', userSocketMap)

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id)
        delete userSocketMap[userId]
    })

    socket.on('sendMessage', ({ senderId, recieverId, message }) => {
        const receiverSocketId = userSocketMap[recieverId]
        console.log('receiver Id', receiverId)

        if (receiverSocketId) {
            io.to(receiverSocketId).emit('receivedMessage', {
                senderId,
                message
            })
        }
    })
})

app.post('/send-message', authenticateToken, async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;

        if (!senderId || !receiverId || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const messageId = crypto.randomUUID();

        const params = {
            TableName: 'messages',
            Item: {
                messageId: { S: messageId },
                senderId: { S: senderId },
                receiverId: { S: receiverId },
                message: { S: message },
                timestamp: { S: new Date().toISOString() }
            }
        }

        const command = new PutItemCommand(params);
        await dynamoDbClient.send(command);

        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('receivedMessage', {
                senderId,
                receiverId,
                message
            })
        } else {
            console.log(`Receiver socket ID not found for user ${receiverId}`);
        }
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.log("Error sending message", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/messages', authenticateToken, async (req, res) => {
    try {
        const [senderId, receiverId] = req.query;

        if (!senderId || !receiverId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const senderParamsQuery = {
            TableName: 'messages',
            IndexName: 'senderId-index',
            KeyConditionExpression: 'senderId = :senderId',
            ExpressionAttributeValues: {
                ':senderId': { S: senderId },
            }
        }

        const receiverParamsQuery = {
            TableName: 'messages',
            IndexName: 'receiverId-index',
            KeyConditionExpression: 'receiverId = :receiverId',
            ExpressionAttribteValues: {
                ':receiverId': { S: senderId },
            }
        }

        const senderQueryCommand = new QueryCommand(senderParamsQuery);
        const receiverQueryCommand = new QueryCommand(receiverParamsQuery);

        const senderResult = await dynamoDbClient.send(senderQueryCommand);
        const receiverResult = await dynamoDbClient.send(receiverQueryCommand);

        const filteredSenderMessages = senderResult.Items.filter(item => item.receiverId.S === receiverId);
        const filteredReceiverMessages = receiverResult.Items.filter(item => item.senderId.S === receiverId);

        const combinedMessages = [
            ...filteredSenderMessages,
            ...filteredReceiverMessages
        ].map(item => ({
            messageId: item.messageId.S,
            senderId: item.senderId.S,
            receiverId: item.receiverId.S,
            message: item.message.S,
            timestamp: item.timestamp.S
        })).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        res.status(200).json({ messages: combinedMessages });
    } catch (error) {
        console.log("Error fetching messages", error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/subscribe', authenticateToken, async (req, res) => {
    try {
        const { userId, plan, type } = req.body;

        if (!userId || !plan) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const startDate = new Date().toISOString();

        const duration = plan?.plan === '1 week' ? 7 : plan?.plan === 'monthly' ? 30 : plan?.plan === '3 months' ? 90 : 180;

        const endDate = dayjs(startDate).add(duration, 'day').toISOString();

        const subcriptionId = crypto.randomUUID();

        const params = {
            TableName: 'subscriptions',
            Item: {
                userId: { S: userId },
                subscriptionId: { S: subscriptionId },
                plan: { S: type },
                planName: { S: plan?.plan },
                price: { S: plan?.price },
                startDate: { S: startDate },
                endDate: { S: endDate },
                status: { S: 'active' }
            },
        }
        await dynamoDbClient.send(new PutItemCommand(params))

        const userParams = {
            TableName: 'users',
            Key: {
                userId: { S: userId }
            },
            UpdateExpression: 'SET subcriptions = list_append(if_not_exists(subscriptions, :emptyList), :newSubcrioption)',
            ExpressionAttributeValues: {
                ':newSubcription': {
                    L: [
                        {
                            M: {
                                subscriptionId: { S: subscriptionId },
                                plan: { S: type },
                                planName: { S: plan?.plan },
                                price: { S: plan?.price },
                                startDate: { S: startDate },
                                endDate: { S: endDate },
                                status: { S: 'active' }
                            }
                        }
                    ]
                },
                ':emptyList': []
            },
            ReturnValues: 'UPDATED_NEW'
        }

        await dynamoDbClient.send(new UpdateItemCommand(userParams))
        res.status(200).json({ message: 'Subscription updated successfully' });
    } catch (error) {
        console.log("Error updating subscription", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
)