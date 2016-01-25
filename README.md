# CryptChat
CryptChat is a completely private and server-less (true peer-to-peer) communication space. Chat and send files to each other over the internet without any required usual middle-man (servers). In a time where privacy is rapidly being sacrificed in the name of security, CryptChat brings back that necessary right to privatize communication into your hands.

## Technologies Used
* NodeJS
* WebRTC
* GitHub Electron
* WebTorrent.io

## Side notes (accomplished so far)
This project was made over the course of SwampHacks Hackathon 2016 (amidst having not coming up with any other idea). The original idea was to find a way to create a true, peer-to-peer (server less) and encrypted messaging and file transfer service.

So far, all that has been accomplished is being able to broadcast a file for transfer, using bittorrent and WebRTC. Upon "broadcasting" a file (a.k.a "uploading" a file, which is inaccurate considering that there are no servers to upload the file to), the program emits a magnet link that could then be used by a client to download the broadcasted files.

Only those who have access to this magnet link have access to the actual file being transmitted (so security pretty much relies on the magnet link being kept as secret as possible). From what I understood with WebRTC, an SSL/TLS asymmetric encryption layer is baked in that ensures that the transmitted file is encrypted so that any potential man-in-the-middle cannot obtain the contents of the streamed file.

## What I plan to accomplish/add after
I plan to actually implement an encryption method to the files and messages transferred using some encryption algorithm, but the problem is always with the safe distribution of a key to prevent malicious and unauthorized users from accessing the file/communication stream.

* I was thinking of using [Keybase.io](https://keybase.io), which uses social media activity, as a way to ensure a person's validity. Approved keys from the service between 2 parties would then be used to actually encrypt files and messages sent from peer to peer.

* If using Keybase.io seems to not be appropriate, I was planning to use [KbPGP](https://keybase.io/kbpgp), which is Keybase's Javascript implementation for PGP (Pretty Good Privacy). I have yet to study how PGP really works, but I know that it combines the benefits of asymmetric key encryption and public-key encryption. The [Wikipedia article](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) has some good notes.

* I was also thinking of implementing a more robust user interface, probably using a stricter MVC or Flux framework/library.

* In terms of user's data and communication logs, because of the lack of a central server, I was imagining of having to use some journaling system similar to a decentralized database system where if one of the client is out of sync, an "out of sync" state is first determined by checking the timestamps on each client in the peer-to-peer network. Then, upon resolving that one of the clients are "out of sync", a resolution state where a pull of the unsynchronized data is then made to the device that was determined to be "out of sync".