---
title: "What is Aircrack-ng And How To Use It"
description: "Learn more about Aircrack-ng"
icon: "code"
draft: false
---

This guide will introduce you to the basics of using the Aircrack-ng suite. While it is impossible to cover every scenario, this tutorial aims to provide a solid foundation. For additional information, be prepared to conduct your own research. The Forum and Wiki offer extensive supplementary tutorials and information.

For detailed steps on using Aircrack-ng, refer to the Simple WEP Crack tutorial, which covers the actual Aircrack-ng steps in greater detail.

### Setting Up Hardware and Installing Aircrack-ng

To use Aircrack-ng effectively on your Linux system, you must first patch and install the correct driver for your wireless card. Some cards support multiple drivers, but only certain ones provide the necessary features for Aircrack-ng.

Ensure you have a wireless card compatible with the Aircrack-ng suite, one that can fully support packet injection. A compatible card can crack a wireless access point in under an hour. Refer to the hardware compatibility page to determine the category of your card. For further guidance, read the tutorial, "Is My Wireless Card Compatible?"

First, identify the chipset in your wireless card and the appropriate driver. Use the drivers section to find the necessary drivers.

#### Installing Aircrack-ng

Download the latest version of Aircrack-ng from the homepage, use provided packages, or use a penetration testing distribution like Kali Linux or Pentoo where Aircrack-ng is pre-installed and up-to-date. Follow the documentation on the installation page for detailed installation steps.

### IEEE 802.11 Basics

Before diving into action, it's essential to understand how wireless networks operate. This knowledge will help troubleshoot issues and describe problems accurately for further assistance. Though scientific, this section is crucial for successfully cracking wireless networks.

#### How a Wireless Network Is Found

Managed networks with Access Points (AP) periodically send out beacon frames containing information like:

- Network name (ESSID)
- Encryption status and type
- Supported data rates
- Channel number

This information is visible in tools that connect to the network or when scanning for networks with `iwlist <interface> scan` and `airodump-ng`. Each AP has a unique MAC address used for communication, much like a unique name.

#### Connecting to a Network

To connect to a wireless network, Open System Authentication is commonly used. The process involves:

1. Requesting authentication from the AP.
2. AP responds with authentication approval.
3. Requesting association with the AP.
4. AP responds with connection approval.

Problems may arise if:

- WPA/WPA2 is used, requiring EAPOL authentication.
- The AP has MAC filtering enabled.
- Shared Key Authentication is used, requiring the correct WEP key.

### Simple Sniffing and Cracking

#### Discovering Networks

First, identify potential targets using `airodump-ng` or tools like Kismet. Put your wireless card into monitor mode with:

```sh
airmon-ng start wlan0
```

This creates a new interface, `wlan0mon`. Verify the mode with `iwconfig`. Then, start `airodump-ng` to scan for networks:

```sh
airodump-ng wlan0mon
```

If airodump-ng could connect to the WLAN device, you'll see a screen like this:

---image

airodump-ng hops from channel to channel and shows all access points it can receive beacons from. Channels 1 to 14 are used for 802.11b and g (in US, they only are allowed to use 1 to 11; 1 to 13 in Europe with some special cases; 1-14 in Japan). 802.11a is in the 5GHz and availability in different countries is more fragmented than on 2.4GHz. In general, known channels starts at 36 (32 in some countries) to 64 (68 in some countries) and 96 to 165. Wikipedia has more details on channel availability. The Linux Central Regulatory Domain Agent takes care of allowing/forbidding transmissions on the different channels for your country; however, it needs to be set appropriately.

The current channel is shown in the top left corner.

After a short time some APs and (hopefully) some associated clients will show up.

#### Sniffing IVs

To capture all packets from your target network, tune to a specific channel and save data with:

```sh
airodump-ng -c 11 --bssid 00:01:02:03:04:05 -w dump wlan0mon
```

Capture between 40,000 and 85,000 Initialization Vectors (IVs) for successful WEP cracking. This can be expedited with packet replay attacks.

#### Cracking WEP

Once enough IVs are captured, crack the WEP key with:

```sh
aircrack-ng -b 00:01:02:03:04:05 dump-01.cap
```

Adjust parameters as needed based on the number of IVs and the specific scenario.

### Active Attacks

#### Injection Support

Most devices require patched drivers for packet injection. Some only support certain attacks. Take a look at the compatibility page, column aireplay. Sometimes this table is not up-to-date, so if you see a “NO” for your driver there don't give up yet, but look at the driver homepage, the driver mailing list or our Forum. If you were able to successfully replay using a driver which is not listed as supported, don't hesitate to update the compatibility page table and add a link to a short howto. (To do this, request a wiki account on IRC.)

The first step is to make sure packet injection really works with your card and driver. The easiest way to test it is the injection test attack. Make sure to perform this test prior to proceeding. Your card must be able to successfully inject in order to perform the following steps.

You'll need the BSSID (AP MAC) and ESSID (network name) of an AP that does not do MAC filtering (e.g. your own) and must be in range of the AP.

Try connecting to your AP using airplay-ng:
```sh
aireplay-ng --fakeauth 0 -e "your network ESSID" -a 00:01:02:03:04:05 wlan0mon
```
The value after -a is the BSSID of your AP.

If injection works you should see something like this:
```bash
12:14:06  Sending Authentication Request
12:14:06  Authentication successful
12:14:06  Sending Association Request
12:14:07  Association successful :-)
```
If not

double-check ESSID and BSSID
make sure your AP has MAC filtering disabled
test it against another AP
make sure your driver is properly patched and supported
Instead of “0”, try “6000 -o 1 -q 10”

#### ARP Replay

#### The lazy way
First open a window with an airodump-ng sniffing for traffic (see above). aireplay-ng and airodump-ng can run together. Wait for a client to show up on the target network. Then start the attack:
```sh
aireplay-ng --arpreplay -b 00:01:02:03:04:05 -h 00:04:05:06:07:08 wlan0mon
```

-b specifies the target BSSID, -h the MAC of the connected client.

Now you have to wait for an ARP packet to arrive. Usually you'll have to wait for a few minutes (or look at the next chapter).

If you were successful, you'll see something like this:
```bash
Saving ARP requests in replay_arp-0627-121526.cap
You must also start airodump to capture replies.
Read 2493 packets (got 1 ARP requests), sent 1305 packets...
```

If you have to stop replaying, you don't have to wait for the next ARP packet to show up, but you can re-use the previously captured packet(s) with the -r <filename> option.

When using the ARP injection technique, you can use the PTW method to crack the WEP key. This dramatically reduces the number of data packets you need and also the time needed. You must capture the full packet in airodump-ng, meaning do not use the “--ivs” option when starting it. For aircrack-ng, use “aircrack -z <file name>”. (PTW is the default attack)

If the number of data packets received by airodump-ng sometimes stops increasing you maybe have to reduce the replay-rate. You do this with the -x <packets per second> option. I usually start out with 50 and reduce until packets are received continuously again. Better positioning of your antenna usually also helps.

#### The aggressive way
Most operating systems clear the ARP cache on disconnection. If they want to send the next packet after reconnection (or just use DHCP), they have to send out ARP requests. So the idea is to disconnect a client and force it to reconnect to capture an ARP-request. A side-effect is that you can sniff the ESSID and possibly a keystream during reconnection too. This comes in handy if the ESSID of your target is hidden, or if it uses shared-key authentication.

Keep your airodump-ng and aireplay-ng running. Open another window and run a deauthentication attack:
```sh
aireplay-ng --deauth 5 -a 00:01:02:03:04:05 -c 00:04:05:06:07:08 wlan0mon
```
-a is the BSSID of the AP, -c the MAC of the targeted client.

Wait a few seconds and your ARP replay should start running.

Most clients try to reconnect automatically. But the risk that someone recognizes this attack or at least attention is drawn to the stuff happening on the WLAN is higher than with other attacks.

## Deauthentication Attack

Force a client to reconnect and capture ARP requests by running a deauthentication attack:

```sh
aireplay-ng --deauth 5 -a 00:01:02:03:04:05 -c 00:04:05:06:07:08 wlan0mon
```

### Conclusion

This guide provides a foundational understanding of using the Aircrack-ng suite for wireless network security testing. For more advanced techniques and detailed scenarios, consult the Forum, Wiki, and additional tutorials available online. Remember, successful cracking involves both knowledge and practice, so continue to explore and experiment within legal and ethical boundaries.